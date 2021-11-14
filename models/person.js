"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var url = (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : "";
console.log("connecting to", url);
mongoose_1.default
    .connect(url)
    .then(function (_) {
    console.log("connected to MongoDB");
})
    .catch(function (error) {
    console.log("error connecting to MongoDB:", error.message);
});
var personSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                var _a;
                var numberOfDigits = ((_a = value.match(/\d+/g)) !== null && _a !== void 0 ? _a : []).reduce(function (sum, curr) { return sum + curr; }).length;
                return numberOfDigits >= 8;
            },
            message: function (props) {
                return "Phone number must have at least 8 digits. Value sent: " + props.value;
            },
        },
    },
});
personSchema.set("toJSON", {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
personSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model("Person", personSchema);
