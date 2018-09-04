const fonctions = [
	{
		forme: "\\int x^m\\space\\mathrm{d}x",
		formule: "\\int x^m\\space\\mathrm{d}x = \\frac{1}{m+1}x^{m+1} + c",
		args: ['m'],
		primitive: function(args){
			let m = args['m'];
			return `x^${m+1}/${m+1}`;
		}
	},
	{
		forme: "\\int\\ln^n{x}\\space\\mathrm{d}x",
		formule: "\\int\\ln^n{x}\\space\\mathrm{d}x = \\displaystyle\\sum_{i=0}^n ( (-1)^i *\\frac{n! * ln^{n-i}(x)}{(n-i)!})x + c",
		args: ['n'],
		primitive: function(args){
			let n = args['n'], 
				forme, f;

			if(n > 0){
				if (n > 10){
				forme = `x * sum(k, 0, ${n}, (-1)^k * F^n/P^(n-k) * log(x)^(n-k))`;
					f = Algebrite.run(`eval(${forme}, n, ${n})`)
						.replace(/F\^(\d{1,})/g, '$1!')
						.replace(/\(P\^(\d{1,})\)/g, '$1!')
						.replace('P', '1!')
				}else{
					forme = `x * sum(k, 0, ${n-1}, n!/(n-k)! * (-1)^k * log(x)^(n-k)) + (-1)^n * x * n!`;
					f = Algebrite.run(`eval(${forme}, n, ${n})`);
				}
				return f;
			}else{
				alert('n doit etre plus grande que 0');
				return false;
			}
		}
	},
	{
		forme: "\\int x^k\\ln^n{x}\\space\\mathrm{d}x",
		formule: "\\int\\ln^n{x}\\space\\mathrm{d}x = \\frac{x^{k+1}}{k+1} \\displaystyle\\sum_{i=0}^n ((-1)^i \\frac{n! * ln^{n-i}(x)}{(n-i)!(k+1)^i}) + c",
		args: ['n', 'k'],
		primitive: function(args){
			let n = args['n'], k = args['k'],
				forme, f;

			if(n <= 10){
				forme = `sum(i, 1, ${n+1}, ((-1)^(i+1)) * (x^(k+1)/(k+1)^i) * (log(x)^(n+1-i)) *  (n!/(n+1-i)!) )`,
				f = Algebrite.run(`eval(${forme}, n, ${n}, k, ${k})`);
			}else{
				forme = `sum(i, 1, ${n+1}, ((-1)^(i+1)) * (x^(k+1)/K^i) * (log(x)^(n+1-i)) * (F^n/P^(n+1-i)) )`,
					f = Algebrite.run(`eval(${forme}, n, ${n}, k, ${k})`)
						.replace(/P\^(\d{1,})/g, '* $1!')
						.replace('P', '* 1')
						.replace(/([\-\+])\s?F\^(\d{1,})/g, '$1 $2! ')
						.replace(/^F\^(\d{1,})/, '$1! ')
						.replace(/F\^(\d{1,})/, '* $1! *')
						.replace(/K/g, k+1);
			}

			return f;
		}
	},
	{
		forme: "\\int \\cos^n{x}\\space\\mathrm{d}x",
		formule: "\\text{Si n est pair (n > 0) :} \\int \\cos^n{x}\\space\\mathrm{d}x = \\frac{1}{2^{n-1}}*(\\displaystyle\\sum_{k=0}^{\\frac{n-2}{2}} C^k_n * \\frac{sin((n-2k)x)}{n-2k}) + \\frac{1}{2}C^\\frac{n}{2}_nx)+c\
		\\qquad\
		\\text{Si n est impair (n > 0) :} \\int \\cos^n{x}\\space\\mathrm{d}x = \\frac{1}{2^{n-1}}*(\\displaystyle\\sum_{k=0}^{\\frac{n-1}{2}} C^k_n * \\frac{sin((n-2k)x)}{n-2k}))+c",
		args: ['n'],
		primitive: function(args){
			let n = args['n'],
				forme, f;
			if(n > 0){
				if(!(n & 1)){
					forme = `1/2^(n-1) * ( sum(k, 0, ${(n-2)/2}, n!/((n-k)!*k!) * sin((n-2k)*x)/(n-2k) ) + x/2 * n!/((n/2)!)^2 )`;
						f = Algebrite.run(`eval(${forme}, n, ${n})`);
						return f;
				}else{
					forme = `1/2^(n-1) * sum(k, 0, ${(n-1)/2}, n!/((n-k)!*k!) * sin((n-2k)*x)/(n-2k) )`;
						f = Algebrite.run(`eval(${forme}, n, ${n})`);
						return f;
				}	
			}else{
				alert('n doit etre plus grande que 0');
				return false;
			}
			
		}
	},
	{
		forme: "\\int \\sin^n{x}\\space\\mathrm{d}x",
		args: ['n'],
		formule: "\\text{Si n est pair (n > 0) :} \\int \\sin^n{x}\\space\\mathrm{d}x = \\frac{(-1)^{\\frac{n}{2}}}{2^{n-1}}*(\\displaystyle\\sum_{k=0}^{\\frac{n-2}{2}} (-1)^{k} * C^k_n * \\frac{sin((n-2k)x)}{n-2k}) + (-1)^{\\frac{n}{2}}*\\frac{1}{2}C^\\frac{n}{2}_nx)+c\
		\\qquad\
		\\text{Si n est impair (n > 0) :} \\int \\sin^n{x}\\space\\mathrm{d}x = \\frac{(-1)^{\\frac{n}{2}}}{2^{n-1}}*(\\displaystyle\\sum_{k=0}^{\\frac{n-1}{2}} (-1)^{k} * C^k_n * \\frac{sin((n-2k)x)}{n-2k}))+c",
		primitive: function(args){
			let n = args['n'], forme, f;
			if(n > 0){
				if(!(n & 1)){
					forme = `(-1)^(n/2)/2^(n-1) * ( sum(k, 0, ${(n-2)/2}, (-1)^k * n!/((n-k)!*k!) * sin((n-2k)*x)/(n-2k) ) + (-1)^(n/2) * x/2 * (n)!/((n/2)!)^2 )`;
					f = Algebrite.run(`eval(${forme}, n, ${n})`);
				}else{
					forme = `(-1)^((n-1)/2)/2^(n-1) * sum(k, 0, ${(n-1)/2}, (-1)^(k+1) * n!/((n-k)!*k!) * cos((n-2k)*x)/(n-2k) )`;
					f = Algebrite.run(`eval(${forme}, n, ${n})`);
				}
				return f;
			}else{
				alert('n doit etre plus grande que 0');
				return false;
			}
		}
	},
	{
		forme: "\\int \\sin^k{x}\\cos^n{x}\\space\\mathrm{d}x",
		args: ['n', 'k'],
		formule: "\\text{Si k est impair (k > 0) :} \
		\\int \\sin^k{x}\\cos^n{x}\\space\\mathrm{d}x = (\\displaystyle\\sum_{p=0}^{\\frac{k-1}{2}} (-1)^{p+1} * C^p_\\frac{k-1}{2} * \\frac{(cos^{n+2p+1}(x))}{n+2p+1} )+c\
		\\qquad\
		\\text{Si n est impair (n > 0) :} \
		\\int \\sin^k{x}\\cos^n{x}\\space\\mathrm{d}x = (\\displaystyle\\sum_{p=0}^{\\frac{n-1}{2}} (-1)^p * C^p_{\\frac{n-1}{2}} * \\frac{(cos^{k+2p+1}(x))}{k+2p+1} )+c\
		\\qquad\
		\\text{Si n et k sont pairs (n > 0 et k > 0):}\
		\\int \\sin^k{x}\\cos^n{x}\\space\\mathrm{d}x = (\\displaystyle\\sum_{p=0}^{\\frac{n-1}{2}} (-1)^p * C^p_{\\frac{n}{2}} * \\frac{1}{2^{n+2p+1}} * (\\displaystyle\\sum_{j=0}^{\\frac{n+2p-2}{2}} C^j_{n+2p} * \\frac{sin((n+2p-2j)x)}{n+2p-2j}) + \\frac{1}{2} C^{\\frac{n+2p}{2}}_{n+2p} x )",
		primitive: function(args){
			let n = args['n'], k = args['k'],
				forme, f;
			if(!(k & 1)){
				if(n & 1){
					let N = (n-1)/2;
					forme = `sum(p, 0, ${(n-1)/2}, (-1)^p * ${N}!/((${N}-p)!*p!) * sin(x)^(k+2p+1)/(k+2p+1) )`;
					f = Algebrite.run(`eval(${forme}, k, ${k})`);
				}else{
					let K = k/2,
						h = 'n+2p';
					forme = `sum(p, 0, ${K}, (-1)^p * ${K}!/(p!*(${K}-p)!) * 1/(2^(${h}-1)) * ( sum(i, 0, ${n/2}+p-1, (${h})!/(i!*(${h}-i)!) * sin((${h}-2i)*x)/(${h}-2i) ) + 1/2 * x * (${h})!/(((${h})/2)!^2) ) )`;
					f = Algebrite.run(`eval(${forme}, n, ${n})`);
				}	
			}else{
				let K = (k-1)/2;
				forme = `sum(p, 0, ${(k-1)/2}, (-1)^(p+1) * ${K}!/((${K}-p)!*p!) * cos(x)^(n+2p+1)/(n+2p+1) )`;
				f = Algebrite.run(`eval(${forme}, n, ${n})`);
			}
			return f;

		},
	},
	{
		forme: "\\int \\tan^n{x}\\space\\mathrm{d}x",
		args: ['n'],
		formule: "\\text{Si n est pair (n > 0) :}\\int \\tan^n{x}\\space\\mathrm{d}x = (\\displaystyle\\sum_{k=0}^{\\frac{n-2}{2}} (-1)^k \\frac{tan^{n-(2k+1)}(x)}{n-(2k+1)}) + (-1)^{\\frac{n}{2}}x + c\
		\\qquad\
		\\text{Si n est impair (n > 0) :}\\int \\tan^n{x}\\space\\mathrm{d}x = (\\displaystyle\\sum_{k=0}^{\\frac{n-3}{2}} (-1)^k \\frac{tan^{n-(2k+1)}(x)}{n-(2k+1)}) + (-1)^{\\frac{n+1}{2}}\\ln{\\cos{x}} + c\
		",
		primitive: function(args){
			let n = args['n'], forme, f;
			if(n > 1){
				if(n & 1){
					forme = `sum(k, 0, ${(n-3)/2}, (-1)^k * tan(x)^(n-2k-1)/(n-2k-1) ) + (-1)^((n+1)/2)*log(cos(x))`;
				}else{
					forme = `sum(k, 0, ${(n-2)/2}, (-1)^k * tan(x)^(n-2k-1)/(n-2k-1) ) + (-1)^(n/2) * x`;
				}
				return Algebrite.run(`eval(${forme}, n, ${n})`);
			}else{
				alert('n doit etre plus grande que 1');
				return false;
			}
		}
	},
	{
		forme: "\\int \\cot^n{x}\\space\\mathrm{d}x",
		args: ['n'],
		formule: "\\text{Si n est pair (n > 0) :}\\int \\cot^n{x}\\space\\mathrm{d}x = (\\displaystyle\\sum_{k=0}^{\\frac{n-2}{2}} (-1)^k \\frac{cot^{n-(2k+1)}(x)}{n-(2k+1)}) + (-1)^{\\frac{n}{2}}x + c\
		\\qquad\
		\\text{Si n est impair (n > 0) :}\\int \\cot^n{x}\\space\\mathrm{d}x = (\\displaystyle\\sum_{k=0}^{\\frac{n-3}{2}} (-1)^k \\frac{cot^{n-(2k+1)}(x)}{n-(2k+1)}) + (-1)^{\\frac{n-1}{2}}\\ln{\\sin{x}} + c\
		",
		primitive: function(args){
			let n = args['n'], forme, f;
			if(n > 1){
				if(n & 1){
					forme = `sum(k, 0, ${(n-3)/2}, (-1)^(k+1) * cot(x)^(n-2k-1)/(n-2k-1) ) + (-1)^((n-1)/2)*log(sin(x))`;
				}else{
					forme = `sum(k, 0, ${(n-2)/2}, (-1)^(k+1) * cot(x)^(n-2k-1)/(n-2k-1) ) + (-1)^(n/2) * x`;
				}
				return Algebrite.run(`eval(${forme}, n, ${n})`);
			}else{
				alert('n doit etre plus grande que 1');
				return false;
			}
		}
	},
	{
		forme: "\\int e^{kx}\\cos^n{x}\\space\\mathrm{d}x",
		args: ['k', 'n'],
		formule: "\\text{Si n est impair (n >= 0) :} \\int e^{kx}\\cos^n{x}\\space\\mathrm{d}x = e^{kx}(\\displaystyle\\sum_{i=0}^{\\frac{n-1}{2}} \\frac{n!}{n-2i}*\\frac{cos^{n-2i-1}(x)}{\\displaystyle\\prod_{p=0}^i (n-2p)^2+k^2})*(kcos{x} + (n-2i)sin{x}))+c\
		\\quad\
		\\text{Si n est pair (n >= 0) :} \\int e^{kx}\\cos^n{x}\\space\\mathrm{d}x = e^{kx}(\\displaystyle\\sum_{i=0}^{\\frac{n}{2}} \\frac{n!}{n-2i}*\\frac{cos^{n-2i-1}(x)}{\\displaystyle\\prod_{p=0}^i (n-2p)^2+k^2})*(kcos{x} + (n-2i)sin{x}))+c",
		primitive: function(args){
			let n = args['n'], k = args['k'], f, forme, N;
			if(n > 0 && k > 0){
				if(!(n & 1)){
					N = n;
				}else{
					N = n-1;
				}
			}else{
				alert('n et k doivent etre plus grands que 0');
				return false;
			}
			
			forme = `e^(k*x) * sum(j, 0, ${N/2}, n!/(n-2j)! * cos(x)^(n-2j-1)/product(p, 0, j, (n-2p)^2+k^2 ) * ((k*cos(x) + (n-2j)*sin(x))) )`;
			return Algebrite.run(`eval(${forme}, n, ${n}, k, ${k})`);
		}
	},
	{
		forme: "\\int x^k e^{nx}\\space\\mathrm{d}x",
		formule: "\\int x^k e^{nx}\\space\\mathrm{d}x = \\frac{e^{nx}}{n}*( \\displaystyle\\sum_{i=0}^{k} (-1)^i * \\frac{k!*x^{k-i}}{(k-i)!*n^i} ) + c",
		args: ['k', 'n'],
		primitive: function(args){
			let k = args['k'], n = args['n'], f, 
				forme = `e^(n*x)/n * sum(j, 0, ${k}, (-1)^j * (k!*x^(k-j))/((k-j)!*n^j) )`
			return Algebrite.run(`eval(${forme}, n, ${n}, k, ${k})`);
		}
	}

]

$(document).ready(function(){

	var currFunction;

	$.each(fonctions, function(i, e){

		let newFonc = $(`<li id=${i}>`);
		$('#function-list').append(newFonc);
		katex.render(e.forme, newFonc[0]);

	});

	$('#function-list > li').click(function(){

		$('#integration').removeClass('active');
		$('#integration .parm-value').val("0");
		$('#integrale').empty();
		$('#primitive-form').empty();
		$('#prim-parms').empty();
		$('#app-container').addClass('active');

		$(this).siblings().removeAttr('class');
		$(this).addClass('selected');

		currFunction = fonctions[this.id];
		currFunction.id = this.id;
		katex.render(currFunction.forme, $('#function-form')[0]);

		$.each(currFunction.args, function(i, e){
			let newArg = $(`<div class="parm">`)
				.append($('<p class="parm-label">').text(e))
				.append($(`<input id=${e} class="parm-value">`));
			$('#prim-parms').append(newArg);
		});

	});

	$('#prim-btn').click(function(){

		var args = {},
			resume = true;

		let inputs = $('#prim-parms input.parm-value');

		$.each(inputs, function(i, e){
			if(e.value && e.value != ""){
				let value = Number(e.value);
				args[e.id] = value;
			}else{
				alert('merci de remplir toute les cases');
				resume = false;
				return resume;
			}
		});

		if(resume){
			var start = new Date().getTime();

			let solution = fonctions[currFunction.id].primitive(args);

			var end = new Date().getTime();
			var time = end - start;
			console.log('Execution time: ' + time);

			if(solution){
				currFunction.solution = solution;
				$('#primitive-form').empty();
				katex.render(math.parse(solution+" + c").toTex(), $('#primitive-form')[0]);
				$('#integration').addClass('active');
			}
		}

	});

	$('#formule').click(function(){
		katex.render(currFunction.formule, $('#expo')[0]);
		$('#expo-container').addClass('shown');
	});

	$('#close').click(function(){
		$('#expo-container').removeAttr('class');
	});

	$('#int-btn').click(function(){

		let a = $('#borne-a')[0].value,
			b = $('#borne-b')[0].value,
			f = currFunction.solution,
			integrale = Algebrite.run(`eval(${f}, x, ${b}) - eval(${f}, x, ${a})`),
			value = math.eval(integrale).toString();
		
		if(integrale && value.indexOf('i') === -1){
			$('#integrale').empty();
			katex.render(value, $('#integrale')[0]);	
		}else{
			alert('math error');
		}

	});

	$('#back').click(function(){
		$('#app-container').removeClass('active');
		$('#function-list > li').removeAttr('class');
	});

	$('#function-list > li')[0].click();

});
