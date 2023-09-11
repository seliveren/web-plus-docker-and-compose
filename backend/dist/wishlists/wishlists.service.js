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
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const wishes_service_1 = require("../wishes/wishes.service");
const constants_1 = require("../utils/constants");
let WishlistsService = class WishlistsService {
    constructor(wishlistRepository, wishesRepository) {
        this.wishlistRepository = wishlistRepository;
        this.wishesRepository = wishesRepository;
    }
    async findOne(id) {
        const wishlist = await this.wishlistRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                owner: true,
                items: true,
            },
        });
        if (!wishlist) {
            throw new common_1.NotFoundException(`${constants_1.wishlistNotFound}`);
        }
        return wishlist;
    }
    async findAll() {
        const wishlists = await this.wishlistRepository.find();
        if (!wishlists) {
            throw new common_1.NotFoundException(`${constants_1.wishlistsNotFound}`);
        }
        return wishlists;
    }
    async createWishlist(user, wishlist) {
        const fullItemsInfo = [];
        for (const el of wishlist.itemsId) {
            const wish = await this.wishesRepository.findOne(el);
            fullItemsInfo.push(wish);
        }
        wishlist.owner = user;
        wishlist.items = fullItemsInfo;
        return this.wishlistRepository.save(wishlist);
    }
    async update(id, wishlist) {
        wishlist.updatedAt = new Date();
        await this.wishlistRepository.update(id, wishlist);
        return this.wishlistRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.wishlistRepository.delete(id);
    }
};
WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        wishes_service_1.WishesService])
], WishlistsService);
exports.WishlistsService = WishlistsService;
//# sourceMappingURL=wishlists.service.js.map