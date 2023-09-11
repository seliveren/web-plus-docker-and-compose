"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_entity_1 = require("./entities/user.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const constants_1 = require("../utils/constants");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async viewProfile(req) {
        if (!req.user) {
            throw new common_1.NotFoundException(`${constants_1.userNotFound}`);
        }
        else {
            return req.user;
        }
    }
    async editProfile(req, user) {
        if (!req.user) {
            throw new common_1.NotFoundException(`${constants_1.userNotFound}`);
        }
        else {
            return await this.usersService.update(req.user.id, user);
        }
    }
    async viewCurrentUsersWishes(req) {
        if (!req.user) {
            throw new common_1.NotFoundException(`${constants_1.userNotFound}`);
        }
        else {
            return await this.usersService.findWishes(req.user.id);
        }
    }
    async viewUsersWishes(username) {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new common_1.NotFoundException(`${constants_1.userNotFound}`);
        }
        else {
            return await this.usersService.findWishes(user.id);
        }
    }
    async viewOthersProfile(username) {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new common_1.NotFoundException(`${constants_1.userNotFound}`);
        }
        else {
            return user;
        }
    }
    async findUserByEmailOrUsername({ query }) {
        return this.usersService.find(query);
    }
};
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "viewProfile", null);
__decorate([
    (0, common_1.Patch)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editProfile", null);
__decorate([
    (0, common_1.Get)('me/wishes'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "viewCurrentUsersWishes", null);
__decorate([
    (0, common_1.Get)(':username/wishes'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "viewUsersWishes", null);
__decorate([
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "viewOthersProfile", null);
__decorate([
    (0, common_1.Post)('find'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUserByEmailOrUsername", null);
UsersController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map