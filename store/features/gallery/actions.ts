import { fetchAcoountImages } from '../../../services/apis'
import createAsyncThunk from '../../middleware/customCreateThunk'

export const fetchMyImages = createAsyncThunk({
  api: fetchAcoountImages,
  EVENT_NAME: 'gallery/fetchMyImages',
})
