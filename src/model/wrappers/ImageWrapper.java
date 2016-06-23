package model.wrappers;

public class ImageWrapper {
	public static model.Image map(entities.Image i) {
		model.Image image = null;
		if(i != null) {
			image = new model.Image();
			image.setImage(i.getImage());
		}
		return image;
	}
}
