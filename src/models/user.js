const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    address: {
        street: {
            type: String,
            required: true
        },
        zipCode: {
            type: String
        },
        country: {
            type: String
        }
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
        minlengh: 4
    },
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ]
});

userSchema.methods.createJsonWebToken = async function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_TOKEN);
    this.tokens.push({token});
    await this.save();
    return token;
}

userSchema.pre("save", async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne( {username} );
    if (user == null) {
        throw new Error("Unable to login");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Unable to login");
    }
    return user;
}

userSchema.methods.toJSON = function() {
    const user = this.toObject();

    delete user.tokens;
    delete user.password;
    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;