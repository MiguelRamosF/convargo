'use strict';

//list of truckers
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL steps
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];


//Function who checks if a object exists in a array of objects (Truckers or Deliveries) considering the parameter id 
//and returns the corresponding object in the array
function search_object_by_id(id,arrayOfobjects)
{
	var object;
    for (var i in arrayOfobjects)
    {
        if (arrayOfobjects[i].id == id) 
        {
            object=arrayOfobjects[i];
        }
    }
    return object;
}

//Step 1: Computing the shipping price 
function shipping_price()
{
	var truckerObject;
	for(var i in deliveries)
	{
		truckerObject=search_object_by_id(deliveries[i].truckerId,truckers); //Search of the trucker by its id

		if(truckerObject!=null)
		{
			deliveries[i].price=deliveries[i].distance*truckerObject.pricePerKm
				+ deliveries[i].volume*truckerObject.pricePerVolume;
		}
		else
		{
			console.log("trucker id : " + deliveries[i].truckerId + " in truckers not found");
		}
	}
}

//Step 2 : Computing the shipping price with high volume discount 
function shipping_price_discounted()
{
	var truckerObject;
	for(var i in deliveries)
	{
		truckerObject=search_object_by_id(deliveries[i].truckerId,truckers); //Search of the trucker by its id

		if(truckerObject!=null)
		{
			if(deliveries[i].volume>25)
			{
				deliveries[i].price=deliveries[i].distance*truckerObject.pricePerKm
				+ deliveries[i].volume*truckerObject.pricePerVolume*0.50;
			}
			else if(deliveries[i].volume>10)
			{
				deliveries[i].price=deliveries[i].distance*truckerObject.pricePerKm
				+ deliveries[i].volume*truckerObject.pricePerVolume*0.70;
			}
			else if(deliveries[i].volume>5)
			{
				deliveries[i].price=deliveries[i].distance*truckerObject.pricePerKm
				+ deliveries[i].volume*truckerObject.pricePerVolume*0.90;
			}
			else
			{
				deliveries[i].price=deliveries[i].distance*truckerObject.pricePerKm
				+ deliveries[i].volume*truckerObject.pricePerVolume;
			}
		}
		else
		{
			console.log("trucker id : " + deliveries[i].truckerId + " in truckers not found");
		}
	}
}

//Step 3 : Computing the insurance, treasury, convargo from the commission 
function commission_split()
{
	var commission;
	var insurance;
	var treasury;
	var convargo;

	shipping_price_deductible(); //We apply step 4 (final price) for the next calculations purposes

	for(var i in deliveries)
	{
		commission=deliveries[i].price*0.3;
		insurance=commission/2;
		deliveries[i].commission.insurance=insurance;
		commission=commission-insurance;
		treasury=Math.ceil(deliveries[i].distance/500);
		deliveries[i].commission.treasury=treasury;
		commission=commission-treasury;
		deliveries[i].commission.convargo=commission;
	}
}

//Step 4 (final price) : Computing the shipping price considering the deductible option
function shipping_price_deductible()
{
	shipping_price_discounted(); //We apply step 1 and 2 for the next calculation purposes
	for(var i in deliveries)
	{
		if(deliveries[i].options.deductibleReduction)
		{
			deliveries[i].price+=deliveries[i].volume;
		}
	}
}

//Step 5 : Paying the actors
function paying_actors()
{
	var shipper_debit;
	var commission;
	var trucker_credit;
	var insurance_credit;
	var treasury_credit;
	var convargo_credit;
	var actor;
	var deliveryObject;
	shipping_price_deductible(); //We apply step 4 to set the final price

	for(var i in actors)
	{
		deliveryObject=search_object_by_id(actors[i].deliveryId,deliveries)
		if(deliveryObject!=null)
		{
			shipper_debit=deliveryObject.price;
			commission=shipper_debit*0.3;
			trucker_credit=shipper_debit-commission;
			insurance_credit=deliveryObject.commission.insurance;
			treasury_credit=deliveryObject.commission.treasury;
			convargo_credit=deliveryObject.commission.convargo;

			actor=actors[i].payment;

			for(var i in actor)
			{
				switch (actor[i].who)
				{
					case "shipper":
						actor[i].amount=shipper_debit;
						break;
					case "trucker":
						actor[i].amount=trucker_credit;
						break;
					case "insurance":
						actor[i].amount=insurance_credit;
						break;
					case "treasury":
						actor[i].amount=treasury_credit;
						break;
					case "convargo":
						actor[i].amount=convargo_credit;
						break;
				}
			}
		}
		else
		{
			console.log("delivery id : " + actors[i].deliveryId + " in deliveries not found");
		}
	}
}



commission_split();
paying_actors();

console.log(deliveries);
console.log(actors);