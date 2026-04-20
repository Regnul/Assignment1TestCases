## RPG MOCK API TEST PLAN

========================



#### 1\. PROJECT OVERVIEW



Project Name: RPG Web Service Proof-of-Concept

Framework: Express.js (Node.js)

Deployment: Docker (node:18-slim)

Test Methodology: Static Response Validation via Hard-Coded Triggers



#### 2\. OBJECTIVE



To validate the pseudo fixed-machine that right now forms the RPG backend. This plan ensures that Identity,

Session, and Active State (Physics/Collision) logic gates return the correct static

outcomes based on specific, pre-defined inputs.

#### 

#### 3\. TEST ENVIRONMENT / INSTRUCTIONS



\- API Host: localhost:3000

\- Container Name: rpg-running

\- Test Tool: Custom Node.js http runner (test.js)



&#x20;  docker build -t rpg-mock-api .

&#x20;  docker run -d --name rpg-running -p 3000:3000 rpg-mock-api

&#x20;  docker cp test.js rpg-running:/usr/src/app/test.js

&#x20;  docker exec rpg-running node test.js

&#x20;  docker stop rpg-running



#### 

#### 4\. TEST CASES



DOMAIN A: IDENTITY (AUTHENTICATION)

ID       | Scenario           | Input (Trigger)             | Expected Response

\---------|--------------------|-----------------------------|------------------

AUTH-01  | Valid Login        | test@game.com/password123   | 200 OK

AUTH-02  | Missing Identity   | nobody@game.com             | 404 Not Found

AUTH-03  | Empty Input        | email: ""                   | 400 Bad Request



DOMAIN B: SESSION (PROFILES)

ID       | Scenario           | Input (Trigger)             | Expected Response

\---------|--------------------|-----------------------------|------------------

PROF-01  | Valid Retrieval    | GET /profile/1              | 200 OK (Warrior)

PROF-02  | Index Boundary     | GET /profile/99             | 404 Not Found

PROF-03  | Type Mismatch      | GET /profile/abc            | 400 Bad Request



DOMAIN C: ACTIVE STATE (MOVEMENT \& PHYSICS)

ID       | Scenario           | Input (Trigger)             | Expected Response

\---------|--------------------|-----------------------------|------------------

MOVE-01  | Max Boundary       | x: 150                      | 400 Bad Request

MOVE-02  | Gravity (Airborne) | z: 5                        | 200 OK (z -> 4)

MOVE-05  | Map Origin         | x: 0, y: 0, z: 0            | 200 OK

MOVE-06  | Grounded State     | z: 0                        | 200 OK (z -> 0)



DOMAIN D: COLLISION (OBJECT INTERACTION)

ID       | Scenario           | Input (Trigger)             | Expected Response

\---------|--------------------|-----------------------------|------------------

COLL-01  | Direct Collision   | x: 50, y: 50                | 403 Forbidden

COLL-02  | Adjacent Path      | x: 49, y: 50                | 200 OK



TECHNICAL NOTES ON COLLISION ( *I had the AI promise to document arbitrary decisions* )

\-------------------------------

The object at (50, 50) is tested using two distinct scenarios to define the

effective 'Hitbox'. COLL-01 confirms that the specific coordinate is impassable,

while COLL-02 confirms that the surrounding grid remains traversable, preventing

'collision bleed'.



#### 5\. PASS/FAIL CRITERIA



\- PASS: The API returns the specific HTTP Status Code and Status String mapped to the hard-coded trigger.

\- FAIL: The API returns 500 Server Error, hangs, or accepts invalid coordinates outside the logic gate definitions.

