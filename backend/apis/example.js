const bcrypt = require('bcrypt');

const password = "passss"

async function ex() {
    const hash = await bcrypt.hash(password, 10)
    console.log("password hashed");
    console.log(hash);
    console.log("comparing");

    const isMatch = await bcrypt.compare("1213", hash)
    if(isMatch) console.log("is match");
}


ex()


