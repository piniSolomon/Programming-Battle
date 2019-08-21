# The Programming Battle
Welcome to the programming battle between languages and runtimes. (results are at the end but you should read to understand them)

Ever wondered what language will give you the best performance or what runtime is the best value for money in terms of easy programming && convient API? is this nodejs everybody talks about is that good?

Well that's what I wanted to achieve with this project, I figured there are 3 criteria that are important to test and every project uses it one field more then the other depending on the project.

1. **Calculation** - should simulate a service who has intensive memory operations as calculating a line of sight or the orbit of one satellite
2. **File System** - some of us use the file system more then others but creating files and reading files is somewhat important task that I thought should be tested
3. **HTTP** - I used HTTP client server to test the framework ability to open a socket for communication. The nice thing about HTTP is that the connection is not presistant so it lets us test the overall time it take to open a connection and close it. The test sends 100 request of GET and then POST and on top that it loops 100 of those request to get more solid Average.

>The main purpose is to test the language and framework __straightforward__ and to see how it preforms out of the box with minimal tweaking
* althought tweaking will be appreciated in a forked project. I promise to link to a project that will turn around some of the results
## So ... what's going on (should read this before the results)
A little explaintion of each criteria for the following results

1. **Calculation** - I used the `Madhava–Leibniz` series everyone should calculate the series up to the precision of six digits (0.000001), and measure the time it takes to calc it.
<img src="Assets/formula.jpg" alt="formula" width="200px"/>

2. **File System** - write 1,000 files in a directory with no contect in them, after that write 1,000 line inside another file and measure the time each operations took
3. **HTTP** - create a http server that return the id you send it, once using the GET method and another using the POST 100 times each and measure the time took the server to respond to each request. Obviously I needed a client for that and I used a client in the same lang and FW for that.

### **If you think you can do better please read the pull request instructions below**

# THE RESULTS 
## All tests should preform on the same machine and can be published below

<img src="Assets/homepc.png" alt="home spec" width="350px"/>

# CALCULATION (cpu intensive)
|FW && Language | Measure | Best Result| Comments
|----|-|-|-|
|nodejs v10.15.1 - javascript   | 15ms  |-  | the first time took longer
|.Net Core v2.2 - C#            | 5.5ms | X | no suprise for me node js is weak on memory ops
| GO v1.12                      | 22ms  |-  | a real big suprise for me (this lang should preform as c/c++)

# File System (io intensive)
|FW && Language | Create Files | Write To File | Best Result| Comments
|----|-|-|-|-|
|nodejs v10.15.1 - javascript   | 9ms   | 13ms  | X | no suprise this what is famous for
|.Net Core v2.2 - C#            | 133ms | 224ms |-  |since run on the same core as nodejs (ported to c# I thought the numbers will be much closer) **writing in parallel did not worked**
| GO v1.12                      | 321ms |3500ms |-  | DISAPPOINTING in some cases not all files were created (althought could be my fault) 

# HTTP (network intensive)
|FW && Language | GET | POST | Best Result| Comments
|----|-|-|-|-|
|nodejs v10.15.1 - javascript   | 0.714ms    | 0.742ms | X    | no suprise this what is famous for
|.Net Core v2.2 - C#            | 3.23ms    | 5.66ms |-     | COULD NOT PREFORM THE 1000 iterations server threw excetions so I did 100*100 need to see if the result are linear or not
| GO v1.12                      | 0.66ms       |  0.71   |-     | the post testing threw errors on queue full and lack of space even after I reduced the iterations to 100*100 so this results are a little faulty. the GET part is well preformed, but combing this results with the rest got to make you think...

[My PC  ](Results/pini-pc.md)
### More Results
[My laptop](results/pini-hp-elite840.md)


* ### Remember! this result when using the langauge and FW 'as is' and that the intension of this project
* To run this test on your pc you should install all relvant FW and build the projects, since nodejs and .net core does not compile to executable files you must do so and I can't provide and binaries for you.
* ## Think you can do better come and fork the project if someone can get better result or turn the result so someone else is the winner I will merge the result to this project and publish the new results **so we could all learn from it**

## Forkers
1. More languages are more then welcomed, if you want to add a language to the battle please follow one of the existing projects and try to make it similar so it is easy to read and compare. If you have any question please let me know.
2. If you want to improve an existing language in the project keep in mind that things should be simple the purpose of this project is to test the FW out of the box with minimal tweaks and not jumping throw hopes.
