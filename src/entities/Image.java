package entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;


/**
 * The persistent class for the Image database table.
 * 
 */
@Entity
@NamedQuery(name="Image.findAll", query="SELECT i FROM Image i")
@Table(name="Image")
public class Image implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idImage;
	
	@Lob
	private byte[] image;

	//bi-directional many-to-one association to Item
	@OneToMany(mappedBy="image")
	private List<Item> items;

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

	public List<Item> getItems() {
		return this.items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public Item addItem(Item item) {
		getItems().add(item);
		item.setImage(this);

		return item;
	}

	public Item removeItem(Item item) {
		getItems().remove(item);
		item.setImage(null);

		return item;
	}

}