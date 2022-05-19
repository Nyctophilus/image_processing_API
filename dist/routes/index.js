"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("./api/images"));
var router = express_1.default.Router();
// starter route with a hint to get started with the api
router.get("/", function (req, res) {
    return res.send("hello server... \nfor a quick test, you can navigate to /image?filename=imgName&w=500&h=200");
});
router.use(images_1.default);
exports.default = router;
