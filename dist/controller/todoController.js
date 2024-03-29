"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTODO = exports.updateTODO = exports.getAllTodo = exports.createTodo = exports.getFistData = void 0;
const todoModel_1 = __importDefault(require("../model/todoModel"));
const redis = __importStar(require("redis"));
const utility_1 = require("../utils/utility");
// let redisClient: any
// redisClient = redis.createClient();
// const RedisClientDB = async () => {
//     redisClient.on("error", (error: string) => console.error(`Error : ${error}`));
//     await redisClient.connect();
//   }
// RedisClientDB();
// const client = createClient({ legacyMode: true });
// // console.log(client);
// client.on("error", (error) => {
//   console.error(error);
// });
// client.on("connect", () => {
//   console.log("Redis client connected");
// });
// client.on("ready", () => {
//   console.log("Redis client ready");
// });
// client.on("end", () => {
//   console.log("Redis client disconnected");
// });
// client
//   .connect()
//   .then(() => {
//     console.log("Connected to Redis");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
let redisClient;
(() => __awaiter(void 0, void 0, void 0, function* () {
    redisClient = redis.createClient();
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    yield redisClient.connect();
}))();
const getFistData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const species = req.params.species;
    let isCaches = false;
    let results;
    try {
        const cacheResult = yield redisClient.get(species);
        console.log(cacheResult);
        if (cacheResult) {
            isCaches = true;
            results = JSON.parse(cacheResult);
        }
        const response = yield (0, utility_1.fetchApiData)(species);
        if (response.length === 0) {
            return res.status(404).json({ error: "Not found/ an array is empty" });
        }
        yield redisClient.set(species, JSON.stringify(results));
        return res.status(200).json({ fromCache: isCaches, message: response });
    }
    catch (error) {
        console.log(error);
        res.json({ error: `error ${error}` });
    }
});
exports.getFistData = getFistData;
/** ================ .  CREATE TODO OPERATION ======================*/
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const User = new todoModel_1.default(req.body);
    try {
        const newTodo = yield User.save();
        res.status(200).json({
            message: "You have successfully created your TODO list",
            newTodo,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            route: "todo/create router",
        });
    }
});
exports.createTodo = createTodo;
/** ================ GET TODO LIST    ======================*/
const getAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield todoModel_1.default.find({});
    try {
        res.status(200).json({
            message: "Successful",
            todo,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            route: "todo/get router",
        });
    }
});
exports.getAllTodo = getAllTodo;
/** ================ UPDATE TODO--LIST   ======================*/
const updateTODO = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield todoModel_1.default.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({
            message: "Successfully updated",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            route: "todo/update router",
        });
    }
});
exports.updateTODO = updateTODO;
/** ========================DELETE TODO LIST ============================*/
const deleteTODO = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteMe = yield todoModel_1.default.findByIdAndDelete(req.params.id);
        if (!deleteMe) {
            return res.status(404).json({
                message: "This item has been deleted",
            });
        }
        return res.status(200).json({
            message: "You have successfully deleted your TODO item",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            route: "todo/delete router",
        });
    }
});
exports.deleteTODO = deleteTODO;
