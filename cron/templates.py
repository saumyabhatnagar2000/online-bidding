def winner_mail(buyer_name, item_name, bid_amount, app_link):
    subject = f"AuctKart | Congratulations"
    email_body = f"""\
    <p>Congratulations {buyer_name}</p>
    </br>
    <p>You have won the auction of {item_name} for a bid amount of {bid_amount}. Please visit the link to Proceed: <a href="{app_link}">here</a></p>
    <p>Regards</p>
    <p>Team AuctKart</p>
    """
    return subject, email_body