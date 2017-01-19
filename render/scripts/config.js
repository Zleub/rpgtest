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
		+ character.attrs.agility / 7
		+ character.joblvl() / 14
		+ (character.attrs.leftproficiency - 1) / 7
		- /* Wt. of Equipment */ 1 / 6 ),
			right: parseInt( 1
		+ character.attrs.agility / 7
		+ character.joblvl() / 14
		+ (character.attrs.rightproficiency - 1) / 7
		- /* Wt. of Equipment */ 1 / 6 )
		}
    },

    Basic_Damage: (character, enemy) => {
    	// console.log(character, enemy)
    	return {
    		left: parseInt( ( character.attack()
	    		+ character.attrs.strength
	    		- enemy.attrs.vitality / 2
	    		- enemy.defense() / 2
	    		+ character.joblvl() / 11
	    		+ character.attrs.leftproficiency / 9)
	    			* (character.attack() / enemy.defense()) > 2 ? 2 : (character.attack() / enemy.defense())
	    			* 1 /* Weapon Property Adjustment */
	    			* 1 /* Magical Property Adjustment */),
	    	right: parseInt( ( character.attack()
	    		+ character.attrs.strength
	    		- enemy.attrs.vitality / 2
	    		- enemy.defense() / 2
	    		+ character.joblvl() / 11
	    		+ character.attrs.rightproficiency / 9)
	    			* (character.attack() / enemy.defense()) > 2 ? 2 : (character.attack() / enemy.defense())
	    			* 1 /* Weapon Property Adjustment */
	    			* 1 /* Magical Property Adjustment */)
	    }
    },

    Hit_Rate : (character, enemy) => {
    	return parseInt( (80 +
    		/* Weapon Hit Rate*/ 80 +
    		character.attrs.agility / 10 +
    		character.joblvl() / 10 -
    		enemy.attrs.agility / 20 -
    		/* Wt. of the Weapon */ 1 / 6) / 2)
    }
}

let white_magic = {
    Cure: {
        base: 10,
        text: 'Restore small amount of HP'
    },
    Cura: 30,
    Curaga: 80,
    Curaja: 120
}


