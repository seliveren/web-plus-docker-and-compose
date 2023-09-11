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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wish_entity_1 = require("./entities/wish.entity");
const constants_1 = require("../utils/constants");
let WishesService = class WishesService {
    constructor(wishRepository) {
        this.wishRepository = wishRepository;
    }
    async findOne(id) {
        const wish = await this.wishRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                owner: true,
            },
        });
        if (!wish) {
            throw new common_1.NotFoundException(`${constants_1.wishNotFound}`);
        }
        else {
            return wish;
        }
    }
    async findLast() {
        const wishes = await this.wishRepository.find({
            order: { createdAt: 'desc' },
            take: 40,
        });
        if (!wishes) {
            throw new common_1.NotFoundException(`${constants_1.wishesNotFound}`);
        }
        else {
            return wishes;
        }
    }
    async findTop() {
        const wishes = await this.wishRepository.find({
            order: { copied: 'desc' },
            take: 20,
        });
        if (!wishes) {
            throw new common_1.NotFoundException(`${constants_1.wishesNotFound}`);
        }
        else {
            return wishes;
        }
    }
    async findAll() {
        const wishes = this.wishRepository.find();
        if (!wishes) {
            throw new common_1.NotFoundException(`${constants_1.wishesNotFound}`);
        }
        else {
            return wishes;
        }
    }
    async createWish(user, wish) {
        wish.owner = user;
        wish.raised = 0;
        wish.copied = 0;
        return this.wishRepository.save(wish);
    }
    async copyWish(user, wish) {
        const wishToBeCopied = await this.wishRepository.findOne({
            where: { id: wish.id },
        });
        wishToBeCopied.copied = wish.copied + 1;
        await this.wishRepository.update(wish.id, wishToBeCopied);
        const _a = await this.wishRepository.findOne({
            where: { id: wish.id },
        }), { id, createdAt, updatedAt, offers } = _a, rest = __rest(_a, ["id", "createdAt", "updatedAt", "offers"]);
        return this.wishRepository.save(Object.assign(Object.assign({}, rest), { raised: 0, copied: 0, owner: user }));
    }
    async update(id, wish) {
        const wishUpdated = await this.wishRepository.findOne({ where: { id } });
        if (!wish) {
            throw new common_1.NotFoundException(`${constants_1.wishNotFound}`);
        }
        else {
            wish.updatedAt = new Date();
            await this.wishRepository.update(id, wish);
            return wishUpdated;
        }
    }
    async remove(id) {
        const wishToBeDeleted = this.wishRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!wishToBeDeleted) {
            throw new common_1.NotFoundException(`${constants_1.wishNotFound}`);
        }
        else {
            await this.wishRepository.delete(id);
        }
    }
};
WishesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WishesService);
exports.WishesService = WishesService;
//# sourceMappingURL=wishes.service.js.map