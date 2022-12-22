from pymongo import MongoClient
def get_database():
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://cg-hackathon:saumya20000@cluster0.bpdxxbh.mongodb.net/?retryWrites=true&w=majority"
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING) 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client['test']
  
# This is added so that many files can reuse the function get_database()
from time import sleep
from datetime import datetime

db = get_database()
users = db['users']
listings = db["listings"]
biddings = db["biddings"]
items = db["items"]
collections_pool = db["collections"]

def run_forever():
    try:
        while True:
            for listing in listings.find({"active": True, "end_date": {"$lt":datetime.now()}}).sort("end_date",-1):
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
    #listing_type = listing.get("listing_type")
    listing_id = listing.get("_id")
    item_id = listing.get("item_id")
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
        users.replace_one(user)
    
    #item is sold
    if sold_to:
        user = users.find_one({"_id":user_id})
        user["wallet"] -= sold_at
        users.replace_one(user)

        #end listing
        listing["active"] = False

        #update item 
        item["status"] = "sold"
        item["sold_to"] = sold_to
        item["sold_at"] = sold_at

        
    else:
        item["status"] = "unsold"

    listings.replace_one(listing)
    items.replace_one(item)

    collection = {"user_id":user_id, "collection_amount":sold_at, "item_id":item.get("_id"),"listing_id":listing.get("_id"),"createdAt": datetime.now()}
    collections_pool.insert_one(collection)  
    return 
        
        









if __name__ == "__main__":
    run_forever()
    