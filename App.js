var Contracts = { ITequipmentContract: {
abi:[
	{
		"constant": true,
		"inputs": [],
		"name": "ITequipmentCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ITequipmentList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ITequipmentNo",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ITequipmentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Serial",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Owner",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ITequipmentNo",
				"type": "uint256"
			}
		],
		"name": "getITequipment",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_ITname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_serial",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_owner",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "registerNewITequipment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ITequipmentNo",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_ITname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_serial",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_owner",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "transferITequipment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
],
address: "0x7290dbc8cf1c19bc145a3f16f9a93bfd75218fe7",
endpoint: "https://sepolia.infura.io/v3/"
}}
function ITequipmentApp(Contract) {
this.web3 = null;
this.instance = null;
this.Contract = Contract;
}
ITequipmentApp.prototype.onReady = function() {
this.init(function () {
$('#message').append("DApp loaded successfully.");
});
this.bindButtons();
this.loadITequipment();
}
ITequipmentApp.prototype.init = function(cb) {
// enable and connect to MetaMask
if (window.ethereum) {
this.web3 = new Web3(ethereum);
try {
ethereum.enable();
} catch (error) {
}
}
// Create the contract interface using the ABI provided in the configuration.
var contract_interface = this.web3.eth.contract(this.Contract.abi);
// Create the contract instance for the specific address provided in the configuration.
this.instance = contract_interface.at(this.Contract.address);
cb();
}
if(typeof(Contracts) === "undefined") var Contracts={ ITequipmentContract: { abi: [] }};
var itequipmentApp = new ITequipmentApp(Contracts['ITequipmentContract']);
$(document).ready(function() {
itequipmentApp.onReady();
});
//Calls the houseCount function in the smart contract
ITequipmentApp.prototype.getITequipmentCount = function (cb) {
this.instance.ITequipmentCount(function (error, ITequipmentCount) {
	cb(error, ITequipmentCount);
	});
	};
	// Calls the houseList function in the smart contract
	ITequipmentApp.prototype.getITequipment = function (ITequipmentNo, cb) {
	this.instance.ITequipmentList(ITequipmentNo, function (error, ITequipment) {
	cb(error, ITequipment);
	});
	};
	ITequipmentApp.prototype.loadITequipment = function () {
	var that = this;
	this.getITequipmentCount(function (error, ITequipmentCount) {
	if (error) {
	console.log(error)
	}
	$("#message").text("ITequipment Count: " + ITequipmentCount);
	for (let i = 1; i <= ITequipmentCount; i++) {
	var ITequipmentNo = i;
	that.getITequipment(ITequipmentNo, function (error, ITequipment) {
	if (error) {
	console.log(error)
	}
	var number = ITequipment[0];
	var name = ITequipment[1];
	var serial = ITequipment[2];
	var status = ITequipment[3];
	var owner = ITequipment[4];
	var wallet = ITequipment[5];
	var ITequipmentTemplate = "<tr><td>" + number + "</td><td>" + name + "</td><td>" + serial + "</td><td>" + status + "</td><td>" + owner + "</td><td>" + wallet +"</td></tr>"
	$("#ITequipmentListResults").append(ITequipmentTemplate);
	});
	}
	var nextITequipmentCount = ITequipmentCount.toNumber() + 1; //find the next number
        $("#newITequipmentNo").val(nextITequipmentCount)
        $("#newITequipmentNo").attr('disabled', true)
				$("#txfITequipmentName").attr('disabled', true)
				$("#txfSerial").attr('disabled', true)
				$("#txfStatus").attr('disabled', true)
				$("#txfAddress").attr('disabled', true)
				$("#newStatus").attr('disabled', true)
				$("#newAddress").attr('disabled', true)
				$("#newStatus").val("Normal")
				$("#mtnITequipmentName").attr('disabled', true)
				$("#mtnSerial").attr('disabled', true)
				$("#mtnOwner").attr('disabled', true)
				$("#mtnAddress").attr('disabled', true)
    });
}


ITequipmentApp.prototype.bindButtons = function(){
    var that = this;

    $(document).on("click", "#button-register", function(){
        that.registerNewITequipment(); //call the registerNewHouse function when the button-register is clicked
    });
		$(document).on("click", "#button-transfer", function() {
			that.transferITequipment();
		});
		$(document).on("click", "#button-retrieve", function() {
			that.retrieveITequipment();
		});
		$(document).on("click", "#button-retrievem", function() {
			that.retrieveITequipmentm();
		});
		$(document).on("click", "#button-maintenance", function() {
			that.maintenanceITequipment();
		});
}

ITequipmentApp.prototype.registerNewITequipment = function(){
    // Get input for house number and owner
    var newITequipmentNo = $("#newITequipmentNo").val();
		var newITname = $("#newITequipmentName").val();
		var newSerial = $("#newSerial").val();
		var newStatus = $("#newStatus").val();
    var newOwner = $("#newOwner").val();
		var newAddress = $("#newAddress").val();
		window.location.href = "App.html";
		alert("Registering " + newITname + " to " + newOwner + " will begin after accepting the transaction");
    this.instance.registerNewITequipment(newITname, newSerial, newStatus, newOwner, newAddress,
        //gas required to execute the transaction
        { from: this.web3.eth.accounts[0], gas: 1000000, gasPrice: 1000000000, gasLimit: 1000000 },
        function(){
            if(error){
                console.log(error);
            }
            else{
                if (receipt.status == 1){
                    $("#newITequipmentNo").val("");
										$("#newITequipmentName").val("");
										$("#newSerial").val("");
										$("#newStatus").val("");
                    $("#newOwner").val("");
										$("#newWallet").val("");
                    that.loadITequipment();
                }
                else{
                    $("#message").text("Registration Failed");
                }
            }
        }

    )
}

ITequipmentApp.prototype.retrieveITequipment = function(){
	var that = this;
	var ITnumber = $("#txfITequipmentNo").val();
	that.getITequipment(ITnumber, function (error, ITequipment) {
	if (error) {
	console.log(error)
	}
	var number = ITequipment[0];
	var name = ITequipment[1];
	var serial = ITequipment[2];
	var status = ITequipment[3];
	var owner = ITequipment[4];
	var wallet = ITequipment[5];
	if (status == "Maintenance" || status == "Decommissioned" || status == "Repairing"){
		alert("The current IT equipment is not available")
		$("#txfOwner").attr('disabled', true);
		$("#txfITequipmentName").val(name)
		$("#txfSerial").val(serial)
		$("#txfStatus").val(status)
		$("#transfermsg").text("Current Owner: " + owner);
		document.getElementById("button-transfer").disabled = true;
	}
	else {
		$("#txfOwner").attr('disabled', false);
		$("#txfITequipmentName").val(name)
		$("#txfSerial").val(serial)
		$("#txfStatus").val(status)
		$("#transfermsg").text("Current Owner: " + owner);
		document.getElementById("button-transfer").disabled = false;
	}

});
}

ITequipmentApp.prototype.transferITequipment = function() {
	// get input values for address and amount

	var txfITequipmentNo = $("#txfITequipmentNo").val();
	var txfITname = $("#txfITequipmentName").val();
	var txfSerial = $("#txfSerial").val();
	var txfStatus = $("#txfStatus").val();
	var txfOwner = $("#txfOwner").val();
	var txfAddress = $("#txfAddress").val();
	window.location.href = "App.html";
	alert("Transfering " + txfITname + " to " + txfOwner + " will begin after accepting the transaction");
	this.instance.transferITequipment(txfITequipmentNo, txfITname, txfSerial,txfStatus, txfOwner,txfAddress,
	// gas required to execute the transaction
	{ from: this.web3.eth.accounts[0], gas: 1000000, gasPrice: 1000000000, gasLimit: 1000000
	},
	function() {
	if(error) {
	console.log(error);
	}
	else {
	if(receipt.status == 1) {
	$("#txfITequipmentNo").val("");
	$("#txfITequipmentName").val("");
	$("#txfSerial").val("");
	$("#txfStatus").val("");
	$("#txfOwner").val("");
	$("#txfAddress").val("");
	that.loadITequipment();
	}
	else {
	$("#message").text("Transfer Failed");
	}
	}
	}
	)
	}

	ITequipmentApp.prototype.retrieveITequipmentm = function(){
		var that = this;
		var ITnumber = $("#mtnITequipmentNo").val();
		that.getITequipment(ITnumber, function (error, ITequipment) {
		if (error) {
		console.log(error)
		}
		var number = ITequipment[0];
		var name = ITequipment[1];
		var serial = ITequipment[2];
		var status = ITequipment[3];
		var owner = ITequipment[4];
		var wallet = ITequipment[5];
		if (status == "Decommissioned"){
			document.getElementById("mtnStatus").disabled = true;
			alert("The current IT equipment has been decommissioned")
			$("#mtnITequipmentName").val(name)
			$("#mtnSerial").val(serial)
			$("#maintainmsg").text("Current Status: " + status);
			document.getElementById("button-maintenance").disabled = true;
		}
		else{
			$("#mtnITequipmentName").val(name)
			$("#mtnSerial").val(serial)
			$("#mtnOwner").val("IT team")
			$("#mtnAddress").val("0x1ddE0B176292a17412A047B20056e16FD12E0483")
			$("#maintainmsg").text("Current Status: " + status);
			document.getElementById("mtnStatus").disabled = false;
			document.getElementById("button-maintenance").disabled = false;
		}
	});
	}

	ITequipmentApp.prototype.maintenanceITequipment = function() {
		// get input values for address and amount

		var mtnITequipmentNo = $("#mtnITequipmentNo").val();
		var mtnITname = $("#mtnITequipmentName").val();
		var mtnSerial = $("#mtnSerial").val();
		var mtnStatus = $("#mtnStatus").val();
		var mtnOwner = $("#mtnOwner").val();
		var mtnAddress = $("#mtnAddress").val();
		window.location.href = "App.html";
		alert(mtnITname + " status will be changed to " + mtnStatus + " after accepting the transaction");
		this.instance.transferITequipment(mtnITequipmentNo, mtnITname, mtnSerial,mtnStatus, mtnOwner,mtnAddress,
		// gas required to execute the transaction
		{ from: this.web3.eth.accounts[0], gas: 1000000, gasPrice: 1000000000, gasLimit: 1000000
		},
		function() {
		if(error) {
		console.log(error);
		}
		else {
		if(receipt.status == 1) {
		$("#mtnITequipmentNo").val("");
		$("#mtnITequipmentName").val("");
		$("#mtnSerial").val("");
		$("#mtnStatus").val("");
		$("#mtnOwner").val("");
		$("#mtnAddress").val("");
		that.loadITequipment();
		}
		else {
		$("#message").text("Transfer Failed");
		}
		}
		}
		)
		}
