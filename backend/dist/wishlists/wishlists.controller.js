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
exports.WishlistsController = void 0;
const common_1 = require("@nestjs/common");
const wishlists_service_1 = require("./wishlists.service");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const constants_1 = require("../utils/constants");
let WishlistsController = class WishlistsController {
    constructor(wishlistsService) {
        this.wishlistsService = wishlistsService;
    }
    async findAll() {
        return this.wishlistsService.findAll();
    }
    async createWishlist(req, wishlist) {
        return this.wishlistsService.createWishlist(req.user, wishlist);
    }
    async update(req, id, wishlist) {
        const wishlistToBeUpdated = await this.wishlistsService.findOne(id);
        if (wishlistToBeUpdated.owner.id === req.user.id) {
            return this.wishlistsService.update(id, wishlist);
        }
        else {
            throw new common_1.BadRequestException(`${constants_1.wishlistEditNotAllowed}`);
        }
    }
    async remove(req, id) {
        const wishlist = await this.wishlistsService.findOne(id);
        if (wishlist.owner.id === req.user.id) {
            return this.wishlistsService.remove(id);
        }
        else {
            throw new common_1.BadRequestException(`${constants_1.wishlistDeletionNotAllowed}`);
        }
    }
    async findOne(id) {
        return await this.wishlistsService.findOne(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, wishlist_entity_1.Wishlist]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "createWishlist", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, wishlist_entity_1.Wishlist]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "findOne", null);
WishlistsController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, common_1.Controller)('wishlistlists'),
    __metadata("design:paramtypes", [wishlists_service_1.WishlistsService])
], WishlistsController);
exports.WishlistsController = WishlistsController;
//# sourceMappingURL=wishlists.controller.js.map