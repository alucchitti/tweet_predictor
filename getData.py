import pandas as pd
import tweepy as tw

consumer_key = 'FnJG9bdfMZl28ljr1QH25alPJ'
consumer_secret = 'JoMnyKXQVzwPTyHfwtkN5Ls4Ni239v5m0ChTuLDMHLa82dogIJ'
access_key= '1420534803858960394-crHDDBH3JKbJTEvjfcWBGsz9IsZLgT'
access_secret = 'KRbG85asHyl4eeLSRqgQCZlGQys9SI4ZAj8GK6LcR0vmx'


auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_key, access_secret)
api = tw.API(auth,wait_on_rate_limit=True)


all_tweets_df = pd.DataFrame()
users = ['BarackObama', 'khloekardashian']
for user in users:
    tweets = api.user_timeline(screen_name=user, 
                               # 200 is the maximum allowed count
                               count=200,
                               include_rts = False,
                               # Necessary to keep full_text 
                               # otherwise only the first 140 words are extracted
                               tweet_mode = 'extended'
                               )
    
    all_tweets = []
    all_tweets.extend(tweets)
    oldest_id = tweets[-1].id
    while True:
        tweets = api.user_timeline(screen_name=user, 
                               # 200 is the maximum allowed count
                               count=200,
                               include_rts = False,
                               max_id = oldest_id - 1,
                               # Necessary to keep full_text 
                               # otherwise only the first 140 words are extracted
                               tweet_mode = 'extended'
                               )
        if len(tweets) == 0:
            break
        oldest_id = tweets[-1].id
        all_tweets.extend(tweets)
        # print('N of tweets downloaded till now {}'.format(len(all_tweets)))
        
    outtweets = [[tweet.full_text.encode("utf-8").decode("utf-8")] 
                 for idx,tweet in enumerate(all_tweets)]
    df = pd.DataFrame(outtweets,columns=["text"])
    df['target'] = user
    # print(df.head())
    all_tweets_df = pd.concat([all_tweets_df, df])
all_tweets_df["target"].replace({"BarackObama": 1, "khloekardashian": 0}, inplace=True)
all_tweets_df.head()

writer = pd.ExcelWriter('tweets.xlsx')
all_tweets_df.to_excel(writer)
writer.save()