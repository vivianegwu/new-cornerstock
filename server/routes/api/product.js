const express = require("express");
const router = express.Router();

// Bring in Models & Helpers
const Product = require("../../models/product");
const Brand = require("../../models/brand");
const Category = require("../../models/category");
const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

router.get("/search", (req, res) => {
  const searchQuery = req.query.search;
  Product.find({ name: { $regex: searchQuery, $options: "i" } }, function(err, docs) {
    // console.log("Partial Search Begins");
    // console.log(docs);
    res.send(docs);
  });
})
router.post(
  "/add",
  upload,
  auth,
  role.checkRole(role.ROLES.Admin),
  (req, res) => {
    const whatsapp = req.body.whatsapp;
    const name = req.body.name;
    const address = req.body.address;
    const image = req.file.path;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const brand = req.body.brand;

    if (!whatsapp) {
      return res.status(400).json({ error: "You must enter whatsapp." });
    }

    if (!description || !name) {
      return res
        .status(400)
        .json({ error: "You must enter description & name." });
    }

    if (!address) {
      return res.status(400)
      .json({ error: "Please enter shop address!" });
    }

    if (!image) {
      return res.status(400).json({ error: "Please upload product image!" });
    }

    if (!quantity) {
      return res.status(400).json({ error: "You must enter a quantity." });
    }

    if (!price) {
      return res.status(400).json({ error: "You must enter a price." });
    }

    const product = new Product({
      whatsapp,
      name,
      address,
      image,
      description,
      quantity,
      price,
      brand,
    });

    Product.findOne({ whatsapp }, (err, existingProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Your request could not be processed. Please try again.",
        });
      }

      // if (existingProduct) {
      //   return res
      //     .status(400)
      //     .json({ error: "This whatsapp is already in use." });
      // }

      const product = new Product({
        whatsapp,
        name,
        address,
        image,
        description,
        quantity,
        price,
        brand,
      });

      product.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "Your request could not be processed. Please try again.",
          });
        }

        res.status(200).json({
          success: true,
          message: `Product has been added successfully!`,
          product: data,
        });
      });
    });
  }
);

// fetch product api
router.get("/item/:slug", (req, res) => {
  const slug = req.params.slug;

  Product.findOne({ slug })
    .populate("brand")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Your request could not be processed. Please try again.",
        });
      }

      if (!data) {
        return res.status(404).json({
          message: "No product found.",
        });
      }

      res.status(200).json({
        product: data,
      });
    });
});

// fetch all products api
router.get("/list", (req, res) => {
  Product.find({})
    .populate("brand", "name")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Your request could not be processed. Please try again.",
        });
      }
      res.status(200).json({
        products: data,
      });
    });
});

// fetch all products by category api
router.get("/list/category/:slug", (req, res) => {
  const slug = req.params.slug;

  Category.findOne({ slug: slug }, "products -_id")
    .populate("products")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Your request could not be processed. Please try again.",
        });
      }

      if (!data) {
        return res.status(404).json({
          message: "No products found.",
        });
      }

      res.status(200).json({
        products: data ? data.products : data,
      });
    });
});

// fetch all products by brand api
router.get("/list/brand/:slug", (req, res) => {
  const slug = req.params.slug;

  Brand.find({ slug }, (err, brand) => {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }

    if (brand.length <= 0) {
      return res.status(404).json({
        message: `Cannot find brand with the slug: ${slug}.`,
      });
    }

    Product.find({ brand: brand[0]._id })
      .populate("brand", "name")
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "Your request could not be processed. Please try again.",
          });
        }
        res.status(200).json({
          products: data,
        });
      });
  });
});

router.get("/list/select", auth, (req, res) => {
  Product.find({}, "name", (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }

    res.status(200).json({
      products: data,
    });
  });
});

router.delete(
  "/delete/:id",
  auth,
  role.checkRole(role.ROLES.Admin),
  (req, res) => {
    Product.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Your request could not be processed. Please try again.",
        });
      }

      res.status(200).json({
        success: true,
        message: `Product has been deleted successfully!`,
        product: data,
      });
    });
  }
);

module.exports = router;
