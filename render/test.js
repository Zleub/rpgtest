const fs = require('fs');

fs.readFile('monsters', (err, data) => {
  if (err) throw err;
  let s = data.toString()

	var i = 0;
	var array = []
	var data

	let mode = ''
	while (i < s.length)
	{
	    var j = s.indexOf("\n", i);
	    if (j == -1) j = s.length;

	    let l = s.substr(i, j-i)

	    if (!l.search(/#/)) {
	    	data = {
	    		id: l.match(/#(\d+)/)[1],
	    		name: l.match(/\.\s*(.+)/)[1],
	    	}
	    	// console.log(data)
	    }
	    else if (!l.search(/\s*•\s*Level/)) {
	    	data.level = l.match(/\s*•\s*Level\s*:\s*(.+)/)[1]
	    	// console.log(data)
	    }
	    else if (!l.search(/\s*•\s*Maximum HP/)) {
	    	data.hp = l.match(/\s*•\s*Maximum HP\s*:\s*(.+)/)[1]
	    	// console.log(data)
	    }
	    else if (!l.search(/\s*•\s*Attack/)) {
	    	data.attack = l.match(/\s*•\s*Attack\s*:\s*(.+)/)[1]
	    	// console.log(data)
	    }
	    else if (!l.search(/\s*•\s*Defense/)) {
	    	data.defense = l.match(/\s*•\s*Defense\s*:\s*(.+)/)[1]
	    	// console.log(data)
	    }
	    else if (!l.search(/\s*•\s*Gil Earned/)) {
	    	data.gils = l.match(/\s*•\s*Gil Earned\s*:\s*(.+)/)[1]
	    	// console.log(data)
	    }
	    else if (!l.search(/\s*•\s*EXP\. Earned/)) {
	    	data.xp = l.match(/\s*•\s*EXP\. Earned\s*:\s*(.+)/)[1]
	    }
	    else if (!l.search(/.+Steals/)) {
	    	// data.xp = l.match(/\s*•\s*EXP\. Earned\s*:\s*(.+)/)[1]
	    	mode = 'steal'
	    }
	    else if (mode == 'steal' && (!l.search(/\s*•\s*/)) ) {
	    	if (!data[mode])
	    		data[mode] = []
	    	data[mode].push( l.match(/\s*•\s*(.+)/)[1] )
	    	// console.log(data)
	    }
	    else if (mode == 'steal' && (!l.search(/$/)) ) {
	    	mode = ''

	    	// console.log(data)
	    }
	    else if (!l.search(/.+Drops/)) {
	    	// data.xp = l.match(/\s*•\s*EXP\. Earned\s*:\s*(.+)/)[1]
	    	mode = 'drop'
	    }
	    else if (mode == 'drop' && (!l.search(/\s*•\s*/)) ) {
	    	if (!data[mode])
	    		data[mode] = []
	    	data[mode].push( l.match(/\s*•\s*(.+)/)[1] )
	    	// console.log(data)
	    }
	    else if (mode == 'drop' && (!l.search(/$/)) ) {
	    	mode = ''

	    }
	    else if (!l.search(/.+Weaknesses/)) {
	    	// data.xp = l.match(/\s*•\s*EXP\. Earned\s*:\s*(.+)/)[1]
	    	mode = 'weaknesses'
	    }
	    else if (mode == 'weaknesses' && (!l.search(/\s*•\s*/)) ) {
	    	if (!data[mode])
	    		data[mode] = []
	    	data[mode].push( l.match(/\s*•\s*(.+)/)[1] )
	    	// console.log(data)
	    }
	    else if (mode == 'weaknesses' && (!l.search(/$/)) ) {
	    	mode = ''

	    	array.push(data)
	    }


	    i = j+1;
	}

	fs.writeFile('monsters.json', JSON.stringify(array) )
});
