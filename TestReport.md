## Test Execution Report: RPG Mock API



\-------



Assignment 2 Thoughts- 



When doing the tests, or creating them- I had to engineer the AI to get it to perform in a useful way. Getting the server and container up was straight forward though.



It frequently wanted to add, add ,add and offer new and expanded ideas. I instead made it recall only the core central tests and offer one logical opposite to each. I then asked if there were any additional edge cases for those three tests. After assessing these I then stated what I expected the test file to look like if it were to integrate additional tests. I then ran the files and I repeated this process a few times, kind of like version control in the AI chat. I observed the AI unit test style and outcomes and edited only as needed. I saw that the AI does not like to fully repeat a task. It wants to offer new materials but has to be explicitly told to provide complete versions of anything it showed me already. This kind of bickering is honestly weird! I felt that my caution up front in how I prompt the AI is where I am actually doing most of the slop prevention. I only let it run with what I am fully on board with and I have it revise anything that is not specific to the expectation. I COULD be letting it do more and be more creative work but it overwhelms me quickly if I do.



\-------



#### 1\. Executive Summary



* **Project:** RPG Web Service Mock-Up
* **Test Date:** April 19, 2026
* **Total Test Cases:** 12
* **Passes:** 12
* **Failures:** 0
* **Success Rate:** 100%
* 

#### 2\. Environment Details



* **Local Path:** C:\\Users\\Bryce\\Desktop\\rpg-mock-project
* **Docker Image:** rpg-mock-api
* **Container ID:** 9ea4163cabc2b44ade807e4c74abba68dc269dba947b240ed6ca692f1ab98d5c
* **Host Port:** 3000
* 

#### 3\. Detailed Results



|Test ID|Scenario|Result|Status Code|
|-|-|-|-|
|AUTH-01|Valid Login|PASS|200|
|AUTH-02|Missing Identity|PASS|404|
|AUTH-03|Empty Email|PASS|400|
|PROF-01|Get Warrior Profile|PASS|200|
|PROF-02|Index Out of Bounds|PASS|404|
|PROF-03|Invalid ID Type|PASS|400|
|MOVE-01|Max Boundary Violation|PASS|400|
|MOVE-02|Gravity Airborne Check|PASS|200|
|MOVE-05|Origin Coordinate Check|PASS|200|
|MOVE-06|Grounded State Check|PASS|200|
|COLL-01|Direct Object Collision|PASS|403|
|COLL-02|Adjacent Clear Path|PASS|200|

#### 

#### 4\. Raw Evidence (PowerShell Output)



PS C:\\Users\\Bryce\\Desktop\\rpg-mock-project> docker run -d --name rpg-running -p 3000:3000 rpg-mock-api
9ea4163cabc2b44ade807e4c74abba68dc269dba947b240ed6ca692f1ab98d5c
PS C:\\Users\\Bryce\\Desktop\\rpg-mock-project> docker cp test.js rpg-running:/usr/src/app/test.js
Successfully copied 2.9kB (transferred 4.61kB) to rpg-running:/usr/src/app/test.js
PS C:\\Users\\Bryce\\Desktop\\rpg-mock-project> docker exec rpg-running node test.js
--- Executing RPG Mock Suite (12 Tests) ---
AUTH-01: Valid Login (Status: 200)
AUTH-02: Missing Identity (Status: 404)
AUTH-03: Empty Email (Status: 400)
PROF-01: Get Warrior Profile (Status: 200)
PROF-02: Index Out of Bounds (Status: 404)
PROF-03: Invalid ID Type (Status: 400)
MOVE-01: Max Boundary Violation (Status: 400)
MOVE-02: Gravity Airborne Check (Status: 200)
MOVE-05: Origin Coordinate Check (Status: 200)
MOVE-06: Grounded State Check (Status: 200)
COLL-01: Direct Object Collision (Impact) (Status: 403)
COLL-02: Adjacent Clear Path (Proximity) (Status: 200)
PS C:\\Users\\Bryce\\Desktop\\rpg-mock-project> docker stop rpg-running

