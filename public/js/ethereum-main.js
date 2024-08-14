var global_seed = undefined;

// Generates a random 12-word seed and displays it in the seed element
function generate_seed() {
    try {
        var create_seed = lightwallet.keystore.generateRandomSeed();
        document.getElementById("seed").value = create_seed;
        generate_addresses(create_seed);
    } catch (err) {
        console.error('Error generating seed:', err);
        show_message('Error generating seed: ' + err.message, 'danger');
    }
}

var total_addresses = 0;

// Generates addresses based on the given seed phrase
function generate_addresses(seed) {
    try {
        if (seed == undefined) {
            seed = document.getElementById("seed").value;
        }

        if (!lightwallet.keystore.isSeedValid(seed)) {
            show_message("Please enter a valid seed", "danger");
            return;
        }

        global_seed = seed;
        total_addresses = prompt("How many addresses do you want to generate?");
        if (!Number.isInteger(parseInt(total_addresses))) {
            show_message("Please enter a valid number of addresses", "danger");
            return;
        }

        var password = Math.random().toString();

        lightwallet.keystore.createVault({
            password: password,
            seedPhrase: seed,
            hdPathString: "m/44'/60'/0'/0" // Ensure the derivation path is specified
        }, function (err, ks) {
            if (err) {
                show_message(err.message || "Error creating vault", "danger");
                return;
            }

            ks.keyFromPassword(password, function (err, pwDerivedKey) {
                if (err) {
                    show_message(err.message || "Error deriving key", "danger");
                    return;
                }

                ks.generateNewAddress(pwDerivedKey, total_addresses);
                var addresses = ks.getAddresses();

                // Initialize Web3
                console.log("Initializing Web3...");
                var web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/e5dc1327315c41d4b12b7502842daf55'));

                // Web3 Initialization Check
                if (!web3) {
                    show_message("Web3 is not initialized properly.", "danger");
                    console.error("Web3 is not initialized properly.");
                    return;
                } else {
                    console.log("Web3 is initialized properly.");
                }

                // Check if Web3 utils are available
                if (!web3.utils) {
                    show_message("Web3 utils are not available.", "danger");
                    console.error("Web3 utils are not available.");
                    return;
                } else {
                    console.log("Web3 utils are available.");
                }

                Promise.all(addresses.map(function (address, index) {
                    return new Promise(function (resolve) {
                        var private_key = ks.exportPrivateKey(address, pwDerivedKey);
                        web3.eth.getBalance("0x" + address, function (error, balance) {
                            if (error) {
                                console.error("Error fetching balance:", error);
                                balance = 0;
                            }

                            resolve(`
                                <div class="address-item">
                                    <h4 class="mb-3">Address ${index + 1}</h4>
                                    <p><strong>Address:</strong> <span class="text-break">0x${address}</span></p>
                                    <p><strong>Private Key:</strong> <span class="text-break">0x${private_key}</span></p>
                                    <p><strong>Balance:</strong> ${web3.utils.fromWei(balance.toString(), "ether")} ETH</p>
                                </div>
                            `);
                        });
                    });
                })).then(function (addressItems) {
                    document.getElementById("addresses").innerHTML = addressItems.join('');
                    show_message(`Generated ${total_addresses} addresses successfully`, "success");
                });
            });
        });
    } catch (err) {
        console.error('Error generating addresses:', err);
        show_message('Error generating addresses: ' + err.message, 'danger');
    }
}

function send_ether() {
    try {
        var seed = global_seed;
        if (seed == undefined) {
            show_message("Please enter seed", "danger");
            return;
        }
        if (!lightwallet.keystore.isSeedValid(seed)) {
            show_message("Please enter a valid seed", "danger");
            return;
        }
        var password = Math.random().toString();
        lightwallet.keystore.createVault({
            password: password,
            seedPhrase: seed,
            hdPathString: "m/44'/60'/0'/0" // Ensure the derivation path is specified
        }, function (err, ks) {
            if (err) {
                show_message(err.message || "Error creating vault", "danger");
                return;
            }

            ks.keyFromPassword(password, function (err, pwDerivedKey) {
                if (err) {
                    show_message(err.message || "Error deriving key", "danger");
                    return;
                }

                ks.generateNewAddress(pwDerivedKey, total_addresses);

                ks.passwordProvider = function (callback) {
                    callback(null, password);
                };

                var provider = new HookedWeb3Provider({
                    host: "https://sepolia.infura.io/v3/e5dc1327315c41d4b12b7502842daf55",
                    transaction_signer: ks
                });

                var web3 = new Web3(provider);

                // Web3 Initialization Check
                if (!web3) {
                    show_message("Web3 is not initialized properly.", "danger");
                    console.error("Web3 is not initialized properly.");
                    return;
                } else {
                    console.log("Web3 is initialized properly.");
                }

                // Check if Web3 utils are available
                if (!web3.utils) {
                    show_message("Web3 utils are not available.", "danger");
                    console.error("Web3 utils are not available.");
                    return;
                } else {
                    console.log("Web3 utils are available.");
                }

                var from = document.getElementById("sender").value;
                var to = document.getElementById("receive").value;
                var value = web3.utils.toWei(document.getElementById("ether").value, "ether");

                web3.eth.sendTransaction({
                    from: from,
                    to: to,
                    gasLimit: '0xC350',
                    gasPrice: '80000000000',
                    value: value,
                    gas: '21000'
                }, function (error, result) {
                    if (error) {
                        show_message(error.message || "Error sending transaction", "danger");
                    } else {
                        show_message("Transaction sent successfully. Txn hash: " + result, "success");
                    }
                });
            });
        });
    } catch (err) {
        console.error('Error sending ether:', err);
        show_message('Error sending ether: ' + err.message, 'danger');
    }
}

function show_message(message, type) {
    var alertClass = type === "success" ? "alert-success" : "alert-danger";
    var icon = type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";
    var alertHtml = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            <i class="${icon} me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    var sysMsgElement = document.getElementById("sys_msg");
    sysMsgElement.innerHTML = alertHtml;
    sysMsgElement.style.opacity = "0";
    setTimeout(function () {
        sysMsgElement.style.opacity = "1";
    }, 10);
}

// Add event listeners for input validation
document.addEventListener('DOMContentLoaded', function () {
    var inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            if (this.value.trim() !== '') {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });
});
