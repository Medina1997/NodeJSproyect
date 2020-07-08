const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMensaje = require('./configMensaje');

const app = express();
var admin = require("firebase-admin");
app.use(bodyParser.json());
app.use(cors());

var serviceAccount = require("./login-ng-21302-firebase-adminsdk-14ty3-168cbc2201.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://login-ng-21302.firebaseio.com"
});
const db = admin.firestore();
app.get('/i/:item_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('items').doc(req.params.item_id);
            let item = await document.get();
            let response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
/*app.get('/i', (req, res) => {
    (async () => {
        try {
            let query = db.collection('items');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    item: doc.data().item
                };
                response.push(selectedItem);
            }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });*/

app.post('/formulario', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
});

app.listen(3000, () => {
console.log('Servidor corriendo en puerto 3000');
});