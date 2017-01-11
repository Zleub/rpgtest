TODO = [
    {
        "status": "ok",
        "text": `Each character can have, at most, 23 jobs, and every Job comes with a Job LV showing how proficient that specific character is at that Job`
    },{
        "status": "ko",
        "text": `Maximum Job LV is 99`
    },{
        "status": "ok",
        "text": `Every character has a hidden stat called Job Points (JP) that dictates their Job LV growth`
    },{
        "status": "ko",
        "text": `When JP is accumulated to 99, Job level goes up by 1. Each action (except: Front, Back, Escape, and Flee) will contribute a fixed amount of job points to the character.`
    },{
        "status": "ko",
        "text": `The amount of JP contributed follows the rules below:
                 .------------------------.
                 |         JP Gain:       |
    .------------|------------.-----------|
    | Job:       | JobLv 1-14 | JobLv 14+ |
    |------------|------------|-----------|
    |Freelancer  |     20     |     20    |
    |Warrior     |     20     |     14    |
    |Monk        |     20     |     14    |
    |White Mage  |     20     |     10    |
    |Black Mage  |     20     |     10    |
    |Red Mage    |     20     |     12    |
    |Thief       |     20     |     18    |
    |Ranger      |     20     |     14    |
    |Knight      |     20     |     12    |
    |Scholar     |     24     |     24    |
    |Geomancer   |     20     |     14    |
    |Viking      |     20     |     14    |
    |Dragoon     |     20     |     16    |
    |Dark Knight |     20     |     14    |
    |Evoker      |     20     |     10    |
    |Bard        |     20     |     18    |
    |Black Belt  |     20     |     14    |
    |Magus       |     20     |     10    |
    |Devout      |     20     |     10    |
    |Sage        |     20     |     10    |
    |Summoner    |     20     |     12    |
    |Ninja       |     20     |     12    |
    |Onion Knight|     20     |      8    |
    '------------'------------'-----------'`
    },{
        "status": "ko",
        "text": `EXP is experience points you collect after each battle. When you have gained enough EXP, your character will gain one Character LV`
    },{
        "status": "ko",
        "text": `When you go up one Character LV, the following things happen`,
        "content": [
            {
                "status": "ko",
                "text": `Your HP Increases; Your HP gain depends on your Vitality and current Character LV.`
            },{
                "status": "ko",
                "text": `Your stats will shift up to the next level within your Job class.`
            },{
                "status": "ko",
                "text": `If your character is a mage, MP Profile will also shift up one level.`
            },
        ]
    },{
        "status": "ko",
        "text": `This is a chart showing you how much experience is needed to level up at each character level.
    .-------.---------------------------------------------------------------------.
    | Level |     1      2      3      4      5      6      7      8      9     10|
    |-------|---------------------------------------------------------------------|
    |   0+  |    16     31     58     99    159    239    343    473    631    821|
    |  10+  |  1044   1304   1601   1940   2321   2748   3222   3745   4321   4950|
    |  20+  |  5636   6380   7185   8051   8982   9980  11046  12183  13393  14676|
    |  30+  | 16037  17475  18995  20596  22282  24053  25913  27863  29904  32039|
    |  40+  | 34269  36597  39024  41552  44183  46918  49760  52710  55769  58941|
    |  50+  | 62226  65627  69144  72781  76538  80417  84420  88549  92805  97191|
    |  60+  |101707 106356 111139 116058 121115 126311 131648 137128 142752 148522|
    |  70+  |154439 160506 166724 173095 179619 186299 193137 200134 207292 214611|
    |  80+  |222095 229744 237561 245546 253701 262028 270529 279205 288057 297087|
    |  90+  |306298 315689 325264 335023 344968 355100 365422 375934 ------       |
    '-------'---------------------------------------------------------------------'`
    },{
        "status": "ko",
        "text": `Transition Phase: when you switch Jobs, the game will let you know how many battles you will need to fight in order to become proficient at the new Job. (meaning normal stats and performance)

    All Jobs in FFIII have two properties:

    From chaotic to lawful;
    From magical to physical.

    Suppose X axis is from physical (negative) to magical (positive); and Y axis is
    from chaotic (negative) to lawful (positive). The coordinates should be:

    Freelance (0,0)   | Warrior   (-1,1) | Monk      (-1,-1) | B. Mage   (1,-1)
    W. Mage   (1,1)   | R. Mage   (0,2)  | Ranger    (-1,3)  | Knight    (0,4)
    Thief     (-1,-4) | Scholar   (2,2)  | Geomancer (3,-3)  | Dragoon   (-3,3)
    Viking    (-3,-3) | B. Belt   (-4,0) | Bard      (3,3)   | D. Knight (0,-4)
    Evoker    (-3,0)  | Warlock   (4,-4) | Devout    (4,4)   | Summoner  (-4,0)
    Sage      (4,2)   | Ninja     (-2,-4)

    The number of battles in the Transition Phase is then:

    |vertical distance between points| + |horizontal distance between points| -
    job level of the new job / 10

    - It accumulates, so multiple job changes at one time will stalk up the
      adaptation period.
    - It has a cap of 10, so even changing from a Magus to a new Dragoon should
      take 14, the requirement will still be only 10.`
    },{
        "status": "ko",
        "text": `Mechanics and Formulae`,
        "content": [
            {
                "status": "ko",
                "text": `Number of Hits = 1 + Agility / 7 + JobLV / 14 + (Melee Proficiency. - 1) / 7 - Wt. of Equipment / 6`
            },{
                "status": "ko",
                "text": `Archery Number of hits = 1 + Agility / 9 + JobLV / 14 + (Sum of both Melee Prof. - 2) / 14`
            },{
                "status": "ko",
                "text": `Harp Number of hits = 1 + Agility / 6 + JobLV / 22 + (Sum of both Melee Prof. - 2) / 14`
            },{
                "status": "ko",
                "text": `Basic Damage = (Attack + Strength - Enemy's Vitality / 2 - Enemy's Def. / 2 + JobLV / 11 + Melee Prof. / 9) x (Attack / Enemy's Def.) x Weapon Property Adjustment x Magical Property Adjustment`,
                "content" : [
                    {
                        "status": "ok",
                        "text": `This is calculalted once per hand.`
                    },{
                        "status": "ok",
                        "text": `The (Attack / Enemy's def) term has a permitted maximum of 2.`
                    },{
                        "status": "ko",
                        "text": `Property Adjustment is 2 if it is weakness, 0.5 if it is resistance.`
                    }
                ]
            },{
                "status": "ko",
                "text": `Basic Damage: Bare Hands = (JobLV + Strength - Enemy's Vitality / 2 - Enemy's Def. / 2 + CharacterLV / 9 + Melee Prof.) x (Attack / Enemy's Def.) x Weapon Property Adjustment x Magical Property Adjustment`,
                "content" : [
                    {
                        "status": "ko",
                        "text": `This is calculalted once per hand.`
                    },{
                        "status": "ko",
                        "text": `The (Attack / Enemy's def) term has a permitted maximum of 2.`
                    },{
                        "status": "ko",
                        "text": `Property Adjustment is 2 if it is weakness, 0.5 if it is resistance.`
                    }
                ]
            },{
                "status": "ko",
                "text": `Basic Damage: Archery = (Sum of both hands' Attack + Strength - Enemy's Vitality / 2 - Enemy's Def / 2 + Sum of both hands' Melee Prof. / 2) x (Attack / Enemy's Def.) x Weapon Property Adjustment x Magical Property Adjustment`,
                "content" : [
                    {
                        "status": "ko",
                        "text": `The (Attack / Enemy's def) term has a permitted maximum of 2.`
                    },{
                        "status": "ko",
                        "text": `Property Adjustment is 2 if it is weakness, 0.5 if it is resistance.`
                    }
                ]
            },{
                "status": "ko",
                "text": `Basic Damage: Harps = Attack of Weapon + Mind - Enemy's Mind - Enemy's Mag. Def.`
            },{
                "status": "ko",
                "text": `Basic Damage: Archery = (Sum of both hands' Attack + Strength - Enemy's Vitality / 2 - Enemy's Def / 2 + Sum of both hands' Melee Prof. / 2) x (Attack / Enemy's Def.) x Weapon Property Adjustment x Magical Property Adjustment`,
                "content" : [
                    {
                        "status": "ko",
                        "text": `The (Attack / Enemy's def) term has a permitted maximum of 2.`
                    },{
                        "status": "ko",
                        "text": `Property Adjustment is 2 if it is weakness, 0.5 if it is resistance.`
                    }
                ]
            },{
                "status": "ko",
                "text": `Hit Rate (except Archery, Bare Hands, and Harps) = {[80 + Weapon Hit Rate + Agility / 10 + JobLV / 10 - Enemy's Agility / 20 - Wt. of the Weapon / 6] / 2}%`,
                "content" : [
                    {
                        "status": "ko",
                        "text": `Maximum is 95%`
                    }
                ]
            },{
                "status": "ko",
                "text": `Hit Rate: Bare Hands = = {(165 + Agility / 10 + JobLV / 10 - Enemy's Agility / 20) / 2}%`,
                "content" : [
                    {
                        "status": "ko",
                        "text": `Maximum is 95%`
                    }
                ]
            },{
                "status": "ko",
                "text": `Hit Rate: Archery = {[80 + Weapon Hit Rate + Agility / 10 + JobLV / 10 - Enemy's Agility / 20] / 2}%`,
                "content" : [
                    {
                        "status": "ko",
                        "text": `Maximum is 95%`
                    }
                ]
            },{
                "status": "ko",
                "text": `Hit Rate: Harps = (40 + Mind - Enemy's Mind)%`,
                "content" : [
                    {
                        "status": "ko",
                        "text": `Maximum is 95%`
                    }
                ]
            },{
                "status": "ko",
                "text": `Damage Inflicted = Basic Damage from both hands x Random No. x No. of Successful Hits x Critical Adjustment x Dual-hand Adjustment`,
                "content" : [
                    {
                        "status": "ko",
                        "text": `Random No.    = number between 0.5 and 0.7`
                    },{
                        "status": "ko",
                        "text": `Critical Rate = (Agility - Enemy's Agility + 5)%, Maximum is 10%.`
                    },{
                        "status": "ko",
                        "text": `If using two weapons, the Dual-Hand Adjustment will become 0.6.`
                    },{
                        "status": "ko",
                        "text": `Archery, Bare Hands, and Harps DO NOT have dual-hand penalty.`
                    },{
                        "status": "ko",
                        "text": `Harps do not have critical hits.`
                    },
                ]
            },{
                "status": "ko",
                "text": `Melee Proficiency : Each arm has its own proficiency, and the initial level is 1, maximum is 99.`
            }
        ]
    }
]
