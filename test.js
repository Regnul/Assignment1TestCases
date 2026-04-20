const http = require('http');

const runTest = (name, options, data, expectedStatus) => {
    const req = http.request(options, (res) => {
        res.on('data', () => {});
        res.on('end', () => {
            const passed = res.statusCode === expectedStatus;
            console.log(`${passed ? '✅' : '❌'} ${name} (Status: ${res.statusCode})`);
        });
    });
    if (data) req.write(JSON.stringify(data));
    req.end();
};

console.log("--- Executing RPG Mock Suite (12 Tests) ---");

// IDENTITY
runTest('AUTH-01: Valid Login', { hostname: 'localhost', port: 3000, path: '/login', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { email: "test@game.com", password: "password123" }, 200);
runTest('AUTH-02: Missing Identity', { hostname: 'localhost', port: 3000, path: '/login', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { email: "nobody@game.com", password: "123" }, 404);
runTest('AUTH-03: Empty Email', { hostname: 'localhost', port: 3000, path: '/login', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { email: "", password: "123" }, 400);

// PROFILE
runTest('PROF-01: Get Warrior Profile', { hostname: 'localhost', port: 3000, path: '/profile/1', method: 'GET' }, null, 200);
runTest('PROF-02: Index Out of Bounds', { hostname: 'localhost', port: 3000, path: '/profile/99', method: 'GET' }, null, 404);
runTest('PROF-03: Invalid ID Type', { hostname: 'localhost', port: 3000, path: '/profile/abc', method: 'GET' }, null, 400);

// MOVEMENT & PHYSICS
runTest('MOVE-01: Max Boundary Violation', { hostname: 'localhost', port: 3000, path: '/move', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { x: 150, y: 0, z: 0 }, 400);
runTest('MOVE-02: Gravity Airborne Check', { hostname: 'localhost', port: 3000, path: '/move', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { x: 10, y: 10, z: 5 }, 200);
runTest('MOVE-05: Origin Coordinate Check', { hostname: 'localhost', port: 3000, path: '/move', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { x: 0, y: 0, z: 0 }, 200);
runTest('MOVE-06: Grounded State Check', { hostname: 'localhost', port: 3000, path: '/move', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { x: 10, y: 10, z: 0 }, 200);

/**
 * COLLISION TESTING
 * Validates that an object at (50,50) correctly blocks movement while allowing
 * movement in the surrounding walkable area.
 */
runTest('COLL-01: Direct Object Collision (Impact)', { hostname: 'localhost', port: 3000, path: '/move', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { x: 50, y: 50, z: 0 }, 403);
runTest('COLL-02: Adjacent Clear Path (Proximity)', { hostname: 'localhost', port: 3000, path: '/move', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { x: 49, y: 50, z: 0 }, 200);