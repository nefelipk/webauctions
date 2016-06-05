package model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the ItemCategory database table.
 * 
 */
@Embeddable
public class ItemCategoryPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(insertable=false, updatable=false)
	private int idItem;

	@Column(insertable=false, updatable=false)
	private int idCategory;

	public ItemCategoryPK() {
	}
	public int getIdItem() {
		return this.idItem;
	}
	public void setIdItem(int idItem) {
		this.idItem = idItem;
	}
	public int getIdCategory() {
		return this.idCategory;
	}
	public void setIdCategory(int idCategory) {
		this.idCategory = idCategory;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof ItemCategoryPK)) {
			return false;
		}
		ItemCategoryPK castOther = (ItemCategoryPK)other;
		return 
			(this.idItem == castOther.idItem)
			&& (this.idCategory == castOther.idCategory);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.idItem;
		hash = hash * prime + this.idCategory;
		
		return hash;
	}
}