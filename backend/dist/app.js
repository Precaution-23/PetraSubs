"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((req, res, next) => { next(); }, (0, cors_1.default)({ maxAge: 84600 }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// routes setup
(0, routes_1.default)(app);
//mongoose setup
let mongodbURI;
if (process.env.NODE_ENV === 'test') {
    mongodbURI = process.env["MONGODB_TEST_URI"];
}
else {
    mongodbURI = process.env["MONGODB_URI"];
}
let mongoconn = "mongodb://jebo:Greenfour4@cluster0-shard-00-00.ox9zo.mongodb.net:27017,cluster0-shard-00-01.ox9zo.mongodb.net:27017,cluster0-shard-00-02.ox9zo.mongodb.net:27017/mobile-sub-db?ssl=true&replicaSet=atlas-mlf6w8-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.set('useNewUrlParser', true);
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useUnifiedTopology', true);
mongoose_1.default.connect(mongoconn)
    .then(db => {
    console.log('Connected to MongoDB');
});
// Serve up static assets
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/build")));
app.get("*", (_, res) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.sendFile(path_1.default.join(__dirname, "../../frontend/build/index.html"));
});
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`server running on port ${port}..!!`));
exports.default = app;
//# sourceMappingURL=app.js.map