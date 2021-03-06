import encryptor from './encryptor';


export default async function postToDB(dataPayload, price, description, ownerID) {

const driver = require('bigchaindb-driver')


const API_PATH = 'http://78.47.44.213:8209/api/v1/'
//const API_PATH = 'http://78.47.44.213:8209/'


const alice = new driver.Ed25519Keypair()

console.log('Dian: ', alice.publicKey)


var encryptedFile = encryptor(dataPayload);


//Initialize the assetdata variable with the model_creator default to Dian
const assetdata = {
        'model': {
                'model_creator': 'Dian Balta'
        }
}
assetdata.model.encrypted_model = encryptedFile; //Possibly need to change the input payload to BCDB

//assetdata.model.printed_model = dataPayload;

// const metadata = {'model_description': 'chair',
//                 'price': '25.99',
//                 'designer': 'Tasos'}
const metadata = {'model_description': description,
                'price': price,
                'designer': ownerID}


// Construct a transaction payload
const txCreateAliceSimple = driver.Transaction.makeCreateTransaction(
        assetdata,
        metadata,

        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(alice.publicKey))
        ],
        alice.publicKey
)

// Sign the transaction with private keys of Alice to fulfill it
const txCreateAliceSimpleSigned = driver.Transaction.signTransaction(txCreateAliceSimple, alice.privateKey)

// Send the transaction off to BigchainDB
const conn = new driver.Connection(API_PATH)


var txid = await conn.postTransaction(txCreateAliceSimpleSigned);
var retrievedTx = await conn.pollStatusAndFetchTransaction(txCreateAliceSimpleSigned.id);
console.log('Transaction', retrievedTx.id, 'successfully posted.');
var status = await conn.getStatus(txCreateAliceSimpleSigned.id);
console.log('Retrieved status method 2: ', status);
var assets = await conn.searchAssets(txCreateAliceSimpleSigned.id);
console.log('Found assets creaed by Dian Balta: ', assets);
return retrievedTx.id;
// var txid = conn.postTransaction(txCreateAliceSimpleSigned)
//         // Check status of transaction every 0.5 seconds until fulfilled
//         .then(() => conn.pollStatusAndFetchTransaction(txCreateAliceSimpleSigned.id))
//         .then(retrievedTx => {
//                 console.log('Transaction', retrievedTx.id, 'successfully posted.')
//                 return retrievedTx.id})


        
//         .then((txid) => {conn.getStatus(txCreateAliceSimpleSigned.id)
//                 return txid})
//         .then((status, txid) => {console.log('Retrieved status method 2: ', status)
//                 return txid})
//         .then((txid) => {conn.searchAssets(txCreateAliceSimpleSigned.id)
//                 return txid})
//         .then((assets,txid) => {console.log('Found assets creaed by Dian Balta: ', assets)
//                 return txid})

        
        //Add flag for transferring asset to printer if true


        // Transfer bicycle to Bob
        /*
        .then(() => {
                const txTransferBob = driver.Transaction.makeTransferTransaction(
                        // signedTx to transfer and output index
                        [{ tx: txCreateAliceSimpleSigned, output_index: 0 }],
                        [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(bob.publicKey))],
                        // metadata
                
                )

                // Sign with alice's private key
                let txTransferBobSigned = driver.Transaction.signTransaction(txTransferBob, alice.privateKey)
                console.log('Posting signed transaction: ', txTransferBobSigned)

                // Post and poll status
                return conn.postTransaction(txTransferBobSigned)
        })
        .then(res => {
                console.log('Response from BDB server:', res)
                return conn.pollStatusAndFetchTransaction(res.id)
        })
        .then(tx => {
                console.log('Is Bob the owner?', tx['outputs'][0]['public_keys'][0] === bob.publicKey)
                console.log('Was Alice the previous owner?', tx['inputs'][0]['owners_before'][0] === alice.publicKey )
        })
        // Search for asset based on the serial number of the bicycle
        .then(() => conn.searchAssets('Bicycle Inc.'))
        .then(assets => console.log('Found assets with serial number Bicycle Inc.:', assets))
        */
// return txid;
}