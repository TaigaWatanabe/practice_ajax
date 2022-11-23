package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Report;
import com.example.demo.Repository.TopRepository;

@Service
public class TopService {

	@Autowired
	TopRepository topRepository;

	// レコード全件取得
	public List<Report> findAllReport() {
		// 降順に変更
		return topRepository.findAllByOrderByUpdatedDateDesc();
	}

	// レコード追加
	public void saveReport(Report report) {
		topRepository.save(report);
	}

	// レコード1件取得 （最新データ）
	public Report findSelectedPost() {
		return topRepository.findlatest();
	}

	// レコードを取得
	public Report GetReport(Integer id) {
		return topRepository.findById(id).orElse(null);
	}

//	追加
	// レコード削除
	public void deleteReport(Integer id) {
		topRepository.deleteById(id);
	}

}
