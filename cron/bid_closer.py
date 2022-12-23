from pymongo import MongoClient
from templates import winner_mail
from time import sleep
from datetime import datetime, timezone
import requests
import json

mail_url = "http://localhost:3001/send/mail"
headers = {
  'Content-Type': 'application/json'
}
app_link = "localhost:3001"



def get_database():
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://cg-hackathon:saumya20000@cluster0.bpdxxbh.mongodb.net/?retryWrites=true&w=majority"
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING) 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client['test']
  
# This is added so that many files can reuse the function get_database()


db = get_database()
users = db['users']
listings = db["listings"]
biddings = db["biddings"]
items = db["items"]
collections_pool = db["collections"]

def run_forever():
    print(f"script started at {str(datetime.now())}")
    try:
        while True:
            for listing in listings.find({"active": True, "end_date": {"$lt":datetime.now(timezone.utc)}}).sort("end_date",-1):
                print("listing found")
                process_listing(listing)
            sleep(30)
    except Exception:
        sleep(5)
        print("Script crashed restarting......")
        run_forever()
        # handle_exception()

# def handle_exception():
#     # code here
#     pass

def process_listing(listing):
    listing["active"] = False
    listing_id = listing.get("_id")
    item_id = listing.get("itemId")
    item = items.find_one({"_id":item_id})
    sold_at = 0
    sold_to = None
    for bid in biddings.find({"listing_id":listing_id , "active":True}).sort("createdAt"):
        user_id = bid.get("user_id")
        bid_amount = bid.get("bid_amount")

        if bid_amount > sold_at:
            sold_at = bid_amount
            sold_to = user_id
        
        user = users.find_one({"_id":user_id})
        #give user money back in wallet
        user["wallet"] += bid_amount
        users.replace_one({"_id":user_id}, user)
    
    #item is sold
    if sold_to:
        user = users.find_one({"_id":sold_to})
        user["wallet"] -= sold_at
        users.replace_one({"_id":user_id}, user)
        if item:
            item["status"] = "sold"
            item["sold_to"] = sold_to
            item["sold_at"] = sold_at

        
    else:
        if item:
            item["status"] = "unsold"


    listings.replace_one({"_id": listing_id}, listing)
    if item:
        items.replace_one({"_id": item_id}, item)
    x = biddings.update_many({ "listing_id": listing_id }, { "$set": { "active": False } })
    print(f"{x} biddings processed\n")
    if sold_to:
        collection = {"user_id":user_id, "collection_amount":sold_at, "item_id":item.get("_id"),"listing_id":listing.get("_id"),"createdAt": datetime.now(timezone.utc)}
        collections_pool.insert_one(collection)
        print(f"{item.get('_id')} sold to {user_id} for {sold_at}\n")
        send_win_mail(user.get("email"), "test", item.get("name"), sold_at)
    return 
        


def send_win_mail(email,buyer_name,item_name,bid_amount):
    subject, body  = winner_mail(buyer_name,item_name,bid_amount,app_link)
    payload = json.dumps({
    "body": body,
    "email": email,
    "subject": subject
    })
    print(f"email {email}, buyer_name {buyer_name}, item_name {item_name}, bid_amount {bid_amount}")
    response = requests.request("POST", mail_url, headers=headers, data=payload)
    print(response.text)
    return



if __name__ == "__main__":
    run_forever()
    