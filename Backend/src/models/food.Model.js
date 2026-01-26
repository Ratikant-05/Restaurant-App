import mongoose, {Schema} from 'mongoose'

const foodItemSchema = new Schema({
  name: {
    type: String, 
    require: true
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    require: true
  },
  image:{
    type: String,
    require:false,
    default:""
  },
  cusineCategory:{
    type:String,
    require:true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    require: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require:true
  }
});

export default mongoose.model('FoodItem', foodItemSchema);