package com.example.demo.Entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "report")
@Getter
@Setter
public class Report {
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column
	private String content;

	@Column(name = "created_date", insertable = false, updatable = false)
	private Date createdDate;

	@Column(name = "updated_date", insertable = false, updatable = true)
	private Date updatedDate;

	@PreUpdate
	public void onPrePersist() {
		Date date = new Date();
		this.updatedDate = date;
	}

}
