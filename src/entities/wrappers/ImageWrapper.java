package entities.wrappers;

public class ImageWrapper {
	public static entities.Image map(model.Image i) {
		entities.Image image = null;
		if(i != null) {
			image = new entities.Image();
			image.setImage(i.getImage());
		}
		return image;
	}
}
