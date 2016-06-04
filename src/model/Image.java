package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the Image database table.
 * 
 */
@Entity
@NamedQuery(name="Image.findAll", query="SELECT i FROM Image i")
public class Image implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int idImage;

	@Lob
	private byte[] image;

	//bi-directional many-to-one association to Item
	@ManyToOne
	@JoinColumn(name="idImage")
	private Item item;

	public Image() {
	}

	public int getIdImage() {
		return this.idImage;
	}

	public void setIdImage(int idImage) {
		this.idImage = idImage;
	}

	public byte[] getImage() {
		return this.image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public Item getItem() {
		return this.item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

}