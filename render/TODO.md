```
[~] - Each character can have, at most, 23 jobs, and every Job comes with a Job LV showing how proficient that specific character is at that Job
[ ] - Maximum Job LV is 99
[√] - Every character has a hidden stat called Job Points (JP) that dictates their Job LV growth
[ ] - When JP is accumulated to 99, Job level goes up by 1. Each action (except: Front, Back, Escape, and Flee) will contribute a fixed amount of job points to the character.
[ ] - The amount of JP contributed follows the rules below:
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
    '------------'------------'-----------'
[ ] - EXP is experience points you collect after each battle. When you have gained enough EXP, your character will gain one Character LV
[ ] - When you go up one Character LV, the following things happen:
    [ ] - Your HP Increases; Your HP gain depends on your Vitality and current Character LV.
    [~] - Your stats will shift up to the next level within your Job class. For all the Stat Profiles, see section III of the guide.
    [ ] - If your character is a mage, MP Profile will also shift up one level. For all the MP Profiles, see section III of the guide.
[ ] - This is a chart showing you how much experience is needed to level up at each
character level.
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
    '-------'---------------------------------------------------------------------'
[ ] - Transition Phase: when you switch Jobs, the game
will let you know how many battles you will need to fight in order to become
proficient at the new Job. (meaning normal stats and performance)

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
      take 14, the requirement will still be only 10.


[ ] - Mechanics and Formulae
    [~] - Number of Hits = 1 + Agility / 7 + JobLV / 14 + (Melee Proficiency. - 1) / 7 - Wt. of Equipment / 6
    [ ] - Archery Number of hits = 1 + Agility / 9 + JobLV / 14 + (Sum of both Melee Prof. - 2) / 14
    [ ] - Harp Number of hits = 1 + Agility / 6 + JobLV / 22 + (Sum of both Melee Prof. - 2) / 14
    [~] - Basic Damage = (Attack + Strength - Enemy's Vitality / 2 - Enemy's Def. / 2 + JobLV / 11 + Melee Prof. / 9) x (Attack / Enemy's Def.) x Weapon Property Adjustment x Magical Property Adjustment
        [√] - This is calculalted once per hand.
        [√] - The (Attack / Enemy's def) term has a permitted maximum of 2.
        [ ] - Property Adjustment is 2 if it is weakness, 0.5 if it is resistance.
    [ ] - Basic Damage: Bare Hands = (JobLV + Strength - Enemy's Vitality / 2 - Enemy's Def. / 2 + CharacterLV / 9 + Melee Prof.) x (Attack / Enemy's Def.) x Weapon Property Adjustment x Magical Property Adjustment
        [ ] - This is calculalted once per hand.
        [ ] - The (Attack / Enemy's def) term has a permitted maximum of 2.
        [ ] - Property Adjustment is 2 if it is weakness, 0.5 if it is resistance.
    [~] - Hit Rate (except Archery, Bare Hands, and Harps) = {[80 + Weapon Hit Rate + Agility / 10 + JobLV / 10 - Enemy's Agility / 20 - Wt. of the Weapon / 6] / 2}%
        [ ] - Maximum is 95%.
    [ ] - Hit Rate: Bare Hands = = {(165 + Agility / 10 + JobLV / 10 - Enemy's Agility / 20) / 2}%
        [ ] - Maximum is 95%.

```

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Basic Damage: Archery |
----------------------'

Basic Damage = (Sum of both hands' Attack + Strength - Enemy's Vitality / 2 -
               Enemy's Def / 2 + Sum of both hands' Melee Prof. / 2) x (Attack
               / Enemy's Def.) x Weapon Property Adjustment x Magical Property
               Adjustment

- The (Attack / Enemy's def) term has a permitted maximum of 2.
- Property Adjustment is 2 if it is weakness, 0.5 if it is resistance.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Hit Rate: Archery |
------------------'

Hit Rate = {[80 + Weapon Hit Rate + Agility / 10 + JobLV / 10 - Enemy's
           Agility / 20] / 2}%

- Maximum is 95%.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Basic Damage: Harps |
--------------------'

Basic Damage = Attack of Weapon + Mind - Enemy's Mind - Enemy's Mag. Def.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Hit Rate: Harps |
----------------'

Hit Rate = (40 + Mind - Enemy's Mind)%

- Maximum is 95%.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Final Damage: Everything |
-------------------------'

Damage Inflicted = Basic Damage from both hands x Random No. x No. of
                   Successful Hits x Critical Adjustment x Dual-hand Adjustment

Random No.    = number between 0.5 and 0.7
Critical Rate = (Agility - Enemy's Agility + 5)%, Maximum is 10%.

- If using two weapons, the Dual-Hand Adjustment will become 0.6.
- Archery, Bare Hands, and Harps DO NOT have dual-hand penalty.
- Harps do not have critical hits.

The 0.6 Dual-Hand Adjustment seems to be a penalty, but actually not. When
two same weapons are equipped, attack became the sum (doubled) in the damage
calculation. In the final damage calculation, instead of halfing the damage,
the formula only takes 40% away. So, you'll find your two-hand fighting deals
even more damage than adding up each single-hand damage together. The
difference is then the 10% (60% instead of 50%) difference. Conclusion: It's
very effective to fight with two hands.


=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=
{M1-2} Melee Proficiency  |
--------------------------'

Q: I saw "Melee Proficiency" in the formula, what is that?
A: According to the Japanese Complete Guide, this Melee Proficiency is a
   hidden statistic. Each arm has its own proficiency, and the initial level
   is 1, maximum is 99.

Q: How do you increase Melee Proficiency?
A: By attacking. For every 33 attacks, you will gain one level in Melee
   Proficiency. Just keep hitting and it will naturally go up.


=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=
{M1-3} Healing Magic  |
----------------------'

(Outside Battle)
----------------
Total Recovery = Root Recovery x MTA

Root Recovery  = Base x (Mind / 2 + JobLv / 4 + Recipient's Vitality / 8)
MTA            = 1, if 1 ally targeted.
 "             = 0.8, if 2 allies targeted.
 "             = 0.75, if 3 allies targeted.
 "             = 0.7, if 4 allies targeted.

(Inside Battle)
---------------
Total Recovery = Root Recovery x MPA x Random No. x MTA

Root Recovery  = Base x (Mind / 2 + JobLv / 4 + Recipient's Vitality / 8)
MPA            = 1
               = 2, if used on undead.
Random No.     = number between 0.9 and 1.0.
MTA            = 1, if 1 ally targeted.
 "             = 0.7, if 2 allies targeted.
 "             = 0.6, if 3 allies targeted.
 "             = 0.5, if 4 allies targeted.

---------.------------.
W. Magic:|   Base:    |
---------|------------|
Cure     |     10     |
Cura     |     30     |
Curaga   |     80     |
Curaja   |    120     |
---------'------------'
---------.------------.
Summon:  |   Base:    |
---------|------------|
Heatra   |    120     | - Healing Light
---------'------------'

MPA = Magical Property Adjustment
MTA = Multiple Target Adjustment


=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=
{M1-4} Offensive Magic  |
------------------------'

Total Damage = Root Damage x MPA x Random No. x MTA
Success Rate = (30 + Int - Enemy's Mind)%

Root Damage  = (Base + JobLv - Enemy's MDef - Enemy's Mind) x Int / 3
MPA          = 2, if weak against.
 "           = 0.5, if resistant.
Random No.   = number between 0.9 and 1.1, if Success Rate IS passed.
 "           = number between 0.5 and 0.6, if Success Rate ISN'T passed.
MTA          = 1, if 1 enemy targeted.
 "           = 0.6, if 2 enemies targeted.
 "           = 0.5, if 3 enemies targeted.
 "           = 0.4, if 4 enemies targeted.

---------.-----------.
W. Magic:|   Base:   |
---------|-----------|
Aero     |     40    |
Aeroga   |    200    |
Holy     |    300    |
---------'-----------'
---------.-----------.
B. Magic:|   Base:   |
---------|-----------|
Fire     |     40    |
Blizzard |     43    |
Thunder  |     46    |
Poison   |     35    |
Fira     |     85    |
Blizzara |     88    |
Thundara |     85    |
Break    |    110    |
Blizzaga |    180    |
Thundaga |    183    |
Firaga   |    190    |
Bio      |    170    |
Quake    |    140    |
Drain    |    130    |
Flare    |    320    |
Meteor   |    170    |
---------'-----------'
---------.-----------.
Summon:  |   Base:   |
---------|-----------|
Icen     |    190    | - Icy Stare
Icen     |    220    | - Diamond Dust
Spark    |    193    | - Thunderstorm
Spark    |    220    | - Judgment Bolt
Heatra   |    200    | - Hellfire
Heatra   |    220    | - Inferno
Hyper    |    170    | - Clobber
Hyper    |    175    | - Stomp
Hyper    |    220    | - Earthen Fury
Catastro |    255    | - Slash
Leviath  |    300    | - Cyclone
Leviath  |    350    | - Tidal Wave
Bahamur  |    400    | - Megaflare
---------'-----------'

MPA = Magical Property Adjustment
MTA = Multiple Target Adjustment


=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=
{M1-5} Status Magic  |
---------------------'

Inflict Rate = Chance + (JobLv / 7 + Int - Enemy's Mind)%

---------.-----------.
W. Magic:|  Chance:  |
---------|-----------|
Toad     |    10%    |
Mini     |    10%    |
Confuse  |    25%    |
Silence  |    40%    |
Tornado  |    40%    |
---------'-----------'
---------.-----------.
B. Magic:|  Chance:  |
---------|-----------|
Sleep    |    25%    |
Poison   |    30%    |
Blind    |    30%    |
Break    |    30%    |
Shade    |    20%    |
Warp     |    20%    |
Breakga  |    10%    |
Death    |    10%    |
---------'-----------'
---------.-----------.
Summon:  |  Chance:  |
---------|-----------|
Icen     |    25%    | - Mesmerize
Spark    |    20%    | - Mind Blast
Catastro |    10%    | - Zantetsuken
Leviath  |    10%    | - Demon Eye
Bahamur  |    10%    | - Rend
---------'-----------'


=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=
{M1-6} Other Formulae  |
-----------------------'

Action Sequence:
~~~~~~~~~~~~~~~~
Action Score = Agility x 2 - All weight + Random No.

Random No.   = number between 0 and Agility.

- The higher the score, the earlier to take a turn; Calculated every turn.
- All weight includes equipment weight and action weight. Both are not covered
  in this FAQ.

Defend:  (except Knights)
~~~~~~~
For one turn:
Damage received = Original damage x 0.5

Escape:
~~~~~~~
Escape Score = Lowest CharacterLV in party - Highest Monster LV in enemies

- If result > 1, escape is successful.
- If failed, multiple attempts will accumulate the chance.
