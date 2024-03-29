"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imgProcessing_1 = __importDefault(require("../../img-processing/imgProcessing"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var imgRouter = express_1.default.Router();
var imgFunc = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, fn, width, height, errMsg, errMsg, errMsg, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filePath = path_1.default.join(__dirname, '/../../../images/');
                fn = req.query.filename;
                width = req.query.w;
                height = req.query.h;
                if (!(!fn || !width || !height)) return [3 /*break*/, 1];
                errMsg = [];
                if (!fn)
                    errMsg.push('name');
                if (!width)
                    errMsg.push('width');
                if (!height)
                    errMsg.push('height');
                res.status(500).send("You have to write an image ".concat(errMsg.join(' & '), "!"));
                return [3 /*break*/, 7];
            case 1:
                if (!(!/^[0-9]+$/g.test(width) || !/^[0-9]+$/g.test(height))) return [3 /*break*/, 2];
                errMsg = [];
                // negative numbers
                if (parseInt(width) < 1 || parseInt(height) < 1) {
                    if (parseInt(width) < 1)
                        errMsg.push('width that exceeds zero!');
                    if (parseInt(height) < 1)
                        errMsg.push('height that exceeds zero!');
                }
                // string inputs
                else {
                    if (!/^[0-9]+$/g.test(width))
                        errMsg.push('width');
                    if (!/^[0-9]+$/g.test(height))
                        errMsg.push('height');
                }
                res
                    .status(500)
                    .send("You have to write a proper numeric image ".concat(errMsg.join(' & '), "!"));
                return [3 /*break*/, 7];
            case 2:
                if (!(width == '0' || height == '0')) return [3 /*break*/, 3];
                errMsg = [];
                if (width == '0')
                    errMsg.push('width');
                if (height == '0')
                    errMsg.push('height');
                res
                    .status(500)
                    .send("You have to write an image ".concat(errMsg.join(' & '), " that exceeds zero!"));
                return [3 /*break*/, 7];
            case 3:
                _a.trys.push([3, 6, , 7]);
                //FIXDONE - check if the image exists
                fs_1.default.access("".concat(filePath).concat(fn, ".jpg"), fs_1.default.constants.F_OK, function (err) {
                    //err ? 'does not exist' : 'exists'
                    if (err) {
                        res
                            .status(404)
                            .send("Image named '".concat(fn, "' not found on your directory!"));
                    }
                });
                if (!!fs_1.default.existsSync("".concat(filePath).concat(width, "x").concat(height, "_").concat(fn, ".jpg"))) return [3 /*break*/, 5];
                // wait until the image resized
                return [4 /*yield*/, imgProcessing_1.default.imgProcess(fn, width, height)];
            case 4:
                // wait until the image resized
                _a.sent();
                _a.label = 5;
            case 5:
                // console.log(`new|repeated, will use the cached img`);
                // send the edited image as a server response
                res.sendFile("".concat(filePath).concat(width, "x").concat(height, "_").concat(fn, ".jpg"));
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
imgRouter.get('/image', imgFunc);
exports.default = imgRouter;
