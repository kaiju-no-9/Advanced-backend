how to incate docker for redis 
<bash>
docker run --name my-redis -d -p 6379:6379 redis
</bash> 

conneting to continer
<bash>
docker exec -it my-redis redis-cli
</bash>

connecting to redis cli
<bash>
redis-cli
</bash>

using rides as a db 

set and get key

<bash>
SET mykey "Hello" 
GET mykey
</bash>

delate
<bash>
DEL mykey
</bash>
HEST/HGET/HSET/HDEL
<bash>
HSET mykey field1 value1 field2 value2
HGET mykey field1
HGETALL mykey
HDEL mykey field1
</bash>

expample :
<bash>
HSET user:100 name "John Doe" email "user@example.com" age "30"
HGET user:100 name
HGET user:100 email
</bash>

working with queue(redis list)

<bash>
LPUSH queue "task1"
LPUSH queue "task2"
LPUSH queue "task3"
</bash>
<bash>
RPOP queue
</bash>
