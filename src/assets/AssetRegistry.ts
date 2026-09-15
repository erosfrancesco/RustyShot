export const AssetRegistry = {
  nooks: {
    default_nook: '/assets/nooks/default_nook.glb',
    corner_reading_nook: '/assets/nooks/corner_reading_nook.glb',
  },
  shelves: {
    bookshelf_small: '/assets/shelves/bookshelf_small.glb',
    bookshelf_tall: '/assets/shelves/bookshelf_tall.glb',
    floating_shelf: '/assets/shelves/floating_shelf.glb',
  },
  books: {
    hardcover_book: '/assets/books/hardcover_book.glb',
    paperback_book: '/assets/books/paperback_book.glb',
    journal: '/assets/books/journal.glb',
  },
  decor: {
    table_lamp: '/assets/decor/table_lamp.glb',
    plant_small: '/assets/decor/plant_small.glb',
    rug_round: '/assets/decor/rug_round.glb',
    cushion: '/assets/decor/cushion.glb',
  },
  trim: {
    baseboard: '/assets/trim/baseboard.glb',
    crown_molding: '/assets/trim/crown_molding.glb',
    corner_post: '/assets/trim/corner_post.glb',
  },
  lighting: {
    wall_sconce: '/assets/lighting/wall_sconce.glb',
    pendant: '/assets/lighting/pendant.glb',
    string_lights: '/assets/lighting/string_lights.glb',
  },
  textures: {
    oak_wood: '/assets/textures/oak_wood_diffuse.png',
    pine_wood: '/assets/textures/pine_wood_diffuse.png',
    fabric_upholstery: '/assets/textures/fabric_upholstery.png',
  },
} as const;

export type AssetRegistryType = typeof AssetRegistry;
