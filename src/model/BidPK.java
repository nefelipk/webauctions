package model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the Bid database table.
 * 
 */
@Embeddable
public class BidPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	private int idBid;

	@Column(insertable=false, updatable=false)
	private int idBidder;

	@Column(insertable=false, updatable=false)
	private int idItem;

	public BidPK() {
	}
	public int getIdBid() {
		return this.idBid;
	}
	public void setIdBid(int idBid) {
		this.idBid = idBid;
	}
	public int getIdBidder() {
		return this.idBidder;
	}
	public void setIdBidder(int idBidder) {
		this.idBidder = idBidder;
	}
	public int getIdItem() {
		return this.idItem;
	}
	public void setIdItem(int idItem) {
		this.idItem = idItem;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof BidPK)) {
			return false;
		}
		BidPK castOther = (BidPK)other;
		return 
			(this.idBid == castOther.idBid)
			&& (this.idBidder == castOther.idBidder)
			&& (this.idItem == castOther.idItem);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.idBid;
		hash = hash * prime + this.idBidder;
		hash = hash * prime + this.idItem;
		
		return hash;
	}
}