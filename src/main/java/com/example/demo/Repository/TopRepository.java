package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Report;


@Repository
public interface TopRepository extends JpaRepository<Report, Integer> {

	List<Report> findAllByOrderByUpdatedDateDesc();

	 @Query(nativeQuery = true, value = "select * from report order by id desc limit 1 ")
	Report findlatest();

}
