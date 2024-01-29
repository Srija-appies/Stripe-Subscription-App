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
var express_validator_1 = require("express-validator");
var user_1 = __importDefault(require("../models/user"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var checkAuth_1 = require("../middleware/checkAuth");
var stripe_1 = require("../utils/stripe");
var router = express_1.default.Router();
router.post("/signup", (0, express_validator_1.body)("email").isEmail().withMessage("The email is invalid"), (0, express_validator_1.body)("password").isLength({ min: 5 }).withMessage("The password is invalid"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationErrors, errors, _a, email, password, user, hashedPassword, customer, newUser, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validationErrors = (0, express_validator_1.validationResult)(req);
                if (!validationErrors.isEmpty()) {
                    errors = validationErrors.array().map(function (error) {
                        return {
                            msg: error.msg,
                        };
                    });
                    return [2 /*return*/, res.json({ errors: errors, data: null })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, res.json({
                            errors: [
                                {
                                    msg: "Email already in use",
                                },
                            ],
                            data: null,
                        })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, stripe_1.stripe.customers.create({
                        email: email,
                    }, {
                        apiKey: process.env.STRIPE_SECRET_KEY,
                    })];
            case 3:
                customer = _b.sent();
                return [4 /*yield*/, user_1.default.create({
                        email: email,
                        password: hashedPassword,
                        stripeCustomerId: customer.id,
                    })];
            case 4:
                newUser = _b.sent();
                return [4 /*yield*/, jsonwebtoken_1.default.sign({ email: newUser.email }, process.env.JWT_SECRET, {
                        expiresIn: 360000,
                    })];
            case 5:
                token = _b.sent();
                res.json({
                    errors: [],
                    data: {
                        token: token,
                        user: {
                            id: newUser._id,
                            email: newUser.email,
                            stripeCustomerId: customer.id,
                        },
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isMatch, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.json({
                            errors: [
                                {
                                    msg: "Invalids credentials",
                                },
                            ],
                            data: null,
                        })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.json({
                            errors: [
                                {
                                    msg: "Invalids credentials",
                                },
                            ],
                            data: null,
                        })];
                }
                return [4 /*yield*/, jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
                        expiresIn: 360000,
                    })];
            case 3:
                token = _b.sent();
                return [2 /*return*/, res.json({
                        errors: [],
                        data: {
                            token: token,
                            user: {
                                id: user._id,
                                email: user.email,
                            },
                        },
                    })];
        }
    });
}); });
router.get("/me", checkAuth_1.checkAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findOne({ email: req.user })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json({
                        errors: [],
                        data: {
                            user: {
                                id: user._id,
                                email: user.email,
                                stripeCustomerId: user.stripeCustomerId,
                            },
                        },
                    })];
        }
    });
}); });
exports.default = router;
