import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  filteredCategories: any[] = [];
  searchQuery: string = '';

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
      this.filteredCategories = data;
    });
  }

  onSearch() {
    this.filteredCategories = this.categories.filter(category => 
      category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  resetFilter() {
    this.searchQuery = '';
    this.filteredCategories = this.categories;
  }

  navigateToQuiz(categoryId: number) {
    const playerName = 'admin';
    this.router.navigate(['/quiz', categoryId, playerName]);
  }
}
