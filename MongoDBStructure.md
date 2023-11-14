# MongoDB Collections Structure

DB Name: "league".

## Collections:

- "adminAccounts": used to login and access to Admin Panel
  ```
    username: OctopusPrime
    password: password
  ```

- "players": players collections
  ```
    name:"OctopusPrime"
    team:"Free Agent"
    cost:0
    playtime:0
    goal:2
    assist:0
    cleansheet:0
    matches:1
    win:0
    draw:0
    loss:0
    joinDate:2023-11-10T14:23:58.429+00:00
  ```
    
- "teams": teams collections
  ```
    name:"HaxLock All Stars"
    shortName:"HAS"
    players: Array
      0:"Coramello"
      1:"IMBUTO SPERICOLANTE"
    foundationDate:2023-11-10T14:24:57.250+00:00
    totalCost:2
    logoFileName: "HaxLock_All_Stars.png"

  ```

- "leaderboard": Leaderboard collection, it contains a document for each team and it will be updated after every match.

```
  team:"HaxLock All Stars"
  points:0
  matches:0
  win:0
  draw:0
  loss:0
  goalScored:0
  goalTaken:0
```

- "matchday": this collection contains a document for each possible match. Each match can be marked by the status 'played' or 'not played' (it can also be 'wildcard' 'postponed' or others, but all of these can be associated with 'not played'
For a played match we'll have a document similar to this: 

```
matchday: 1
teamA:"HaxLock All Stars"
teamB:"Test Team"
status:"played"
replay:"replay.thehax.pl/upload"
result:"3-2"
scoreA:3
scoreB:2

statsA:Array
  0:Object
    player:"Coramello"
    playtime:120
    goal:2
    assist:1
    cleansheet:0

statsB:Array
  0:Object
    player:"Bachira (ex Gagamaru)"
    playtime:120
    goal:1
    assist:1
    cleansheet:0
```

Instead, for a match not yet played we will have:
```
matchday: 1
teamA:"HaxLock All Stars"
teamB:"Test Team"
status:"notplayed"
```