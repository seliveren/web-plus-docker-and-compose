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
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const offer_entity_1 = require("./entities/offer.entity");
const typeorm_2 = require("typeorm");
const wishes_service_1 = require("../wishes/wishes.service");
const constants_1 = require("../utils/constants");
let OffersService = class OffersService {
    constructor(offerRepository, wishesRepository) {
        this.offerRepository = offerRepository;
        this.wishesRepository = wishesRepository;
    }
    async findAll() {
        const offers = await this.offerRepository.find({
            relations: {
                owner: true,
                item: true,
            },
        });
        if (!offers) {
            throw new common_1.NotFoundException(`${constants_1.offersNotFound}`);
        }
        return offers;
    }
    async findOne(id) {
        const offer = await this.offerRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                owner: true,
                item: true,
            },
        });
        if (!offer) {
            throw new common_1.NotFoundException(`${constants_1.offerNotFound}`);
        }
        return offer;
    }
    async create(user, offer) {
        offer.user = user;
        offer.item = offer.itemId;
        const wish = await this.wishesRepository.findOne(offer.item);
        const donatedAfterOffer = wish.raised + offer.amount;
        if (user.id === wish.owner.id) {
            throw new common_1.BadRequestException(`${constants_1.offerNotAllowed}`);
        }
        if (donatedAfterOffer > wish.price) {
            throw new common_1.BadRequestException(`${constants_1.noMoreOffers}`);
        }
        wish.raised = wish.raised + offer.amount;
        await this.wishesRepository.update(offer.item, wish);
        return this.offerRepository.save(offer);
    }
};
OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        wishes_service_1.WishesService])
], OffersService);
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map