"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const wishes_module_1 = require("./wishes/wishes.module");
const wishlists_module_1 = require("./wishlists/wishlists.module");
const offers_module_1 = require("./offers/offers.module");
const user_entity_1 = require("./users/entities/user.entity");
const wish_entity_1 = require("./wishes/entities/wish.entity");
const wishlist_entity_1 = require("./wishlists/entities/wishlist.entity");
const offer_entity_1 = require("./offers/entities/offer.entity");
const auth_module_1 = require("./auth/auth.module");
require("dotenv/config");
const { POSTGRES_PASSWORD, POSTGRES_USERNAME, POSTGRES_HOST, POSTGRES_DB } = process.env;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            wishes_module_1.WishesModule,
            wishlists_module_1.WishlistsModule,
            offers_module_1.OffersModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: POSTGRES_HOST,
                port: 5432,
                username: POSTGRES_USERNAME,
                password: POSTGRES_PASSWORD,
                database: POSTGRES_DB,
                entities: [user_entity_1.User, wish_entity_1.Wish, wishlist_entity_1.Wishlist, offer_entity_1.Offer],
                synchronize: true,
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map