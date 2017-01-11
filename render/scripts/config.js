let config = {
	jobs: {
		'Freelancer': (c) => {
			if (Freelancer.stats[c])
				return Freelancer.stats[c]
			else {
				let i = Object.keys(Freelancer.stats).reduce( (p, k) => {
					if (Number(k) < p)
						return k
					return p
				}, c)
				if (!Freelancer.stats[i])
					return Freelancer.stats[1]
				else
					return Freelancer.stats[i]
			}
		}


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


