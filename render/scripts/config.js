let JP_table = {
    "Freelancer":  20,
    "Warrior":     14,
    "Monk":        14,
    "White Mage":  10,
    "Black Mage":  10,
    "Red Mage":    12,
    "Thief":       18,
    "Ranger":      14,
    "Knight":      12,
    "Scholar":     24,
    "Geomancer":   14,
    "Viking":      14,
    "Dragoon":     16,
    "Dark Knight": 14,
    "Evoker":      10,
    "Bard":        18,
    "Black Belt":  14,
    "Magus":       10,
    "Devout":      10,
    "Sage":        10,
    "Summoner":    12,
    "Ninja":       12,
    "Onion Knight": 8
}

let Level_table = [
	16, 31, 58, 99, 159, 239, 343, 473, 631, 821,
    1044, 1304, 1601, 1940, 2321, 2748, 3222, 3745, 4321, 4950,
    5636, 6380, 7185, 8051, 8982, 9980, 11046, 12183, 13393, 14676,
    16037, 17475, 18995, 20596, 22282, 24053, 25913, 27863, 29904, 32039,
    34269, 36597, 39024, 41552, 44183, 46918, 49760, 52710, 55769, 58941,
    62226, 65627, 69144, 72781, 76538, 80417, 84420, 88549, 92805, 97191,
    101707, 106356, 111139, 116058, 121115, 126311, 131648, 137128, 142752, 148522,
    154439, 160506, 166724, 173095, 179619, 186299, 193137, 200134, 207292, 214611,
    222095, 229744, 237561, 245546, 253701, 262028, 270529, 279205, 288057, 297087,
    306298, 315689, 325264, 335023, 344968, 355100, 365422, 375934
]

let targets = [
	{ text: 'Ally', type: 'Group' },
	{ text: 'Foe', type: 'Group' },
	{ text: 'Any', type: 'Group' },
	{ text: 'Self', type: 'Character' },
	{ text: 'Party Leader', type: 'Character' }
]

let gambits = [].concat.apply([], [
	'lvl',
	'hp',
	'strength',
	'agility',
	'vitality',
	'intellect',
	'mind'
].map( e => {
	return [
		{ text: `highest ${e}`, target: 'Group' },
		{ text: `lowest ${e}`, target: 'Group' }
	]
})).concat([
	// { text: 'lowest HP', target: 'Group' },
	// { text: 'strongest weapon', target: 'Group' },
	// { text: 'lowest defense', target: 'Group' },
	// { text: 'lowest magick resist', target: 'Group' },

	{ text: 'hp < 100%', target: '*' },
	{ text: 'hp > 100%', target: '*' },
	{ text: 'hp < 90%', target: '*' },
	{ text: 'hp > 90%', target: '*' },
	{ text: 'hp < 80%', target: '*' },
	{ text: 'hp > 80%', target: '*' },
	{ text: 'hp < 70%', target: '*' },
	{ text: 'hp > 70%', target: '*' },
	{ text: 'hp < 60%', target: '*' },
	{ text: 'hp > 60%', target: '*' },
	{ text: 'hp < 50%', target: '*' },
	{ text: 'hp > 50%', target: '*' },
	{ text: 'hp < 40%', target: '*' },
	{ text: 'hp > 40%', target: '*' },
	{ text: 'hp < 30%', target: '*' },
	{ text: 'hp > 30%', target: '*' },
	{ text: 'hp < 20%', target: '*' },
	{ text: 'hp > 20%', target: '*' },
	{ text: 'hp < 10%', target: '*' },
	{ text: 'hp > 10%', target: '*' },
	// { text: 'MP < 100%', target: '*' },
	// { text: 'MP > 100%', target: '*' },
	// { text: 'MP < 90%', target: '*' },
	// { text: 'MP > 90%', target: '*' },
	// { text: 'MP < 80%', target: '*' },
	// { text: 'MP > 80%', target: '*' },
	// { text: 'MP < 70%', target: '*' },
	// { text: 'MP > 70%', target: '*' },
	// { text: 'MP < 60%', target: '*' },
	// { text: 'MP > 60%', target: '*' },
	// { text: 'MP < 50%', target: '*' },
	// { text: 'MP > 50%', target: '*' },
	// { text: 'MP < 40%', target: '*' },
	// { text: 'MP > 40%', target: '*' },
	// { text: 'MP < 30%', target: '*' },
	// { text: 'MP > 30%', target: '*' },
	// { text: 'MP < 20%', target: '*' },
	// { text: 'MP > 20%', target: '*' },
	// { text: 'MP < 10%', target: '*' },
	// { text: 'MP > 10%', target: '*' },

	// { text: 'status = KO', target: '*' },
	// { text: 'status = Stone', target: '*' },
	// { text: 'status = Petrify', target: '*' },
	// { text: 'status = Stop', target: '*' },
	// { text: 'status = Sleep', target: '*' },
	// { text: 'status = Confuse', target: '*' },
	// { text: 'status = Doom', target: '*' },
	// { text: 'status = Blind', target: '*' },
	// { text: 'status = Poison', target: '*' },
	// { text: 'status = Silence', target: '*' },
	// { text: 'status = Sap', target: '*' },
	// { text: 'status = Oil', target: '*' },
	// { text: 'status = Reverse', target: '*' },
	// { text: 'status = Disable', target: '*' },
	// { text: 'status = Immobilize', target: '*' },
	// { text: 'status = Slow', target: '*' },
	// { text: 'status = Disease', target: '*' },
	// { text: 'status = Lure', target: '*' },
	// { text: 'status = Protect', target: '*' },
	// { text: 'status = Shell', target: '*' },
	// { text: 'status = Haste', target: '*' },
	// { text: 'status = Bravery', target: '*' },
	// { text: 'status = Faith', target: '*' },
	// { text: 'status = Reflect', target: '*' },
	// { text: 'status = Invisible', target: '*' },
	// { text: 'status = Regen', target: '*' },
	// { text: 'status = Float', target: '*' },
	// { text: 'status = Berserk', target: '*' },
	// { text: 'status = Bubble', target: '*' },
	// { text: 'status = HP Critical', target: '*' },

	// { text: 'targeting leader', target: 'Group' },
	// { text: 'targeting self', target: 'Group' },
	// { text: 'targeting ally', target: 'Group' },

	// { text: 'highest HP', target: 'Group' },
	// { text: 'lowest HP', target: 'Group' },
	// { text: 'highest max HP', target: 'Group' },
	// { text: 'lowest max HP', target: 'Group' },
	// { text: 'highest MP', target: 'Group' },
	// { text: 'lowest MP', target: 'Group' },
	// { text: 'highest max MP', target: 'Group' },
	// { text: 'lowest max MP', target: 'Group' },
	// { text: 'highest level', target: 'Group' },
	// { text: 'lowest level', target: 'Group' },
	// { text: 'highest strength', target: 'Group' },
	// { text: 'lowest strength', target: 'Group' },
	// { text: 'highest magick power', target: 'Group' },
	// { text: 'lowest magick power', target: 'Group' },
	// { text: 'highest speed', target: 'Group' },
	// { text: 'lowest speed', target: 'Group' },
	// { text: 'highest defense', target: 'Group' },
	// { text: 'highest magick resist', target: 'Group' },

	// { text: 'fire-weak', target: '*' },
	// { text: 'lightning-weak', target: '*' },
	// { text: 'ice-weak', target: '*' },
	// { text: 'earth-weak', target: '*' },
	// { text: 'water-weak', target: '*' },
	// { text: 'wind-weak', target: '*' },
	// { text: 'holy-weak', target: '*' },
	// { text: 'dark-weak', target: '*' },
	// { text: 'fire-vulnerable', target: '*' },
	// { text: 'lightning-vulnerable', target: '*' },
	// { text: 'ice-vulnerable', target: '*' },
	// { text: 'earth-vulnerable', target: '*' },
	// { text: 'water-vulnerable', target: '*' },
	// { text: 'wind-vulnerable', target: '*' },
	// { text: 'holy-vulnerable', target: '*' },
	// { text: 'dark-vulnerable', target: '*' },

	// { text: 'undead', target: '*' }
])

let config = {
	JP_Gain: (character) => {
		if (character.joblvl() > 14)
			return JP_table[character.attrs.job.name]
		else
			return 20
	},

	Number_of_Hits: (character) => {
		return {
			left: parseInt( 1
		+ character.agility() / 7
		+ character.joblvl() / 14
		+ (character.attrs.leftproficiency - 1) / 7
		- /* Wt. of Equipment */ 1 / 6 ),
			right: parseInt( 1
		+ character.agility() / 7
		+ character.joblvl() / 14
		+ (character.attrs.rightproficiency - 1) / 7
		- /* Wt. of Equipment */ 1 / 6 )
		}
    },

    Basic_Damage: (character, enemy) => {
    	return {
    		left: parseInt( ( character.attack()
	    		+ character.strength()
	    		- enemy.vitality() / 2
	    		- enemy.defense() / 2
	    		+ character.joblvl() / 11
	    		+ character.attrs.leftproficiency / 9)
	    			* ((character.attack() / enemy.defense()) > 2 ? 2 : (character.attack() / enemy.defense()))
	    			* 1 /* Weapon Property Adjustment */
	    			* 1 /* Magical Property Adjustment */),
	    	right: parseInt( ( character.attack()
	    		+ character.strength()
	    		- enemy.vitality() / 2
	    		- enemy.defense() / 2
	    		+ character.joblvl() / 11
	    		+ character.attrs.rightproficiency / 9)
	    			* ((character.attack() / enemy.defense()) > 2 ? 2 : (character.attack() / enemy.defense()))
	    			* 1 /* Weapon Property Adjustment */
	    			* 1 /* Magical Property Adjustment */)
	    }
    },

    Hit_Rate : (character, enemy) => {
    	return parseInt( (80 +
    		/* Weapon Hit Rate*/ 80 +
    		character.agility() / 10 +
    		character.joblvl() / 10 -
    		enemy.agility() / 20 -
    		/* Wt. of the Weapon */ 1 / 6) / 2)
    },

	Healing_Magic: (character, target, magic) => {
		return Math.round(magic.base * (character.mind() / 2 + character.joblvl() / 4 + target.vitality() / 8))
	},

	Offensive_Magic: (character, target, magic) => {
		let success_rate = (30 + character.intellect() - target.mind())
		let damages = (magic.base + character.joblvl() - target.magic_defense() - target.mind()) * character.intellect() / 3
		if ( Math.random() * 100 > Success_Rate )
		{
			let r = (Math.random() / 5) + 0.9
			console.log('passed', r)
			return damages * r
		}
		else {
			let r = (Math.random() / 10) + 0.5
			console.log('not passed', r)
			return damages * r
		}
	}
}

let isHealingMagic = (magicname) => {
	return Object.keys(Magic['Healing Magic']).reduce( _ => {
		return Magic['Healing Magic'][_][Object.keys(Magic['Healing Magic'][_]).find( e => e == magicname)]
	})
}

let isOffensiveMagic = (magicname) => {
	return Object.keys(Magic['Offensive Magic']).reduce( _ => {
		return Magic['Offensive Magic'][_][Object.keys(Magic['Offensive Magic'][_]).find( e => e == magicname)]
	})
}

let Magic = {
    'Healing Magic': {
        'White Magic': {
            Cure: {
                base: 10,
                text: 'Restore small amount of HP'
            },
            Cura: {
                base: 30,
                text: 'placeholder'
            },
            Curaga: {
                base: 80,
                text: 'placeholder'
            },
            Curaja: {
                base: 120,
                text: 'placeholder'
            }
        },
        'Summon': {
            Heatra: {
                base: 120,
                text: 'placeholder'
            }
        }
    },
    'Offensive Magic': {
        'White Magic': {
            Aero: {
                base: 40,
                text: 'placeholder'
            },
            Aeroga: {
                base: 200,
                text: 'placeholder'
            },
            Holy: {
                base: 300,
                text: 'placeholder'
            }
        },
        'Black Magic': {
            Fire: {
				level: 1,
                base: 40,
                text: 'placeholder'
            },
            Blizzard: {
				level: 1,
                base: 43,
                text: 'placeholder'
            },
            Thunder: {
				level: 2,
                base: 46,
                text: 'placeholder'
            },
            Poison: {
				level: 2,
                base: 35,
                text: 'placeholder'
            },
            Fira: {
				level: 3,
                base: 85,
                text: 'placeholder'
            },
            Blizzara: {
				level: 3,
                base: 88,
                text: 'placeholder'
            },
            Thundara: {
				level: 3,
                base: 85,
                text: 'placeholder'
            },
            Break: {
				level: 4,
                base: 110,
                text: 'placeholder'
            },
            Blizzaga: {
				level: 4,
                base: 180,
                text: 'placeholder'
            },
            Thundaga: {
				level: 4,
                base: 183,
                text: 'placeholder'
            },
            Firaga: {
				level: 6,
                base: 190,
                text: 'placeholder'
            },
            Bio: {
				level: 6,
                base: 170,
                text: 'placeholder'
            },
            Quake: {
				level: 7,
                base: 140,
                text: 'placeholder'
            },
            Drain: {
				level: 7,
                base: 130,
                text: 'placeholder'
            },
            Flare: {
				level: 8,
                base: 320,
                text: 'placeholder'
            },
            Meteor: {
				level: 8,
                base: 170,
                text: 'placeholder'
            }
        },
        'Summon': {
            Icen: {
                base: 190,
                text: 'Icy Stare'
            },
            Icen: {
                base: 220,
                text: 'Diamond Dust'
            },
            Spark: {
                base: 193,
                text: 'Thunderstorm'
            },
            Spark: {
                base: 220,
                text: 'Judgment Bolt'
            },
            Heatra: {
                base: 200,
                text: 'Hellfire'
            },
            Heatra: {
                base: 220,
                text: 'Inferno'
            },
            Hyper: {
                base: 170,
                text: 'Clobber'
            },
            Hyper: {
                base: 175,
                text: 'Stomp'
            },
            Hyper: {
                base: 220,
                text: 'Earthen Fury'
            },
            Catastro: {
                base: 255,
                text: 'Slash'
            },
            Leviath: {
                base: 300,
                text: 'Cyclone'
            },
            Leviath: {
                base: 350,
                text: 'Tidal Wave'
            },
            Bahamur: {
                base: 400,
                text: 'Megaflare'
            },
        }
    }
}
