<template>
  <div class="container mt-5">
    <header class="text-center">
      <h1>OdysseyFrontiers</h1>
    </header>
    <main>
      <section class="board">
        <h2>게시판</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>번호</th>
              <th>구분</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일자</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in paginatedPosts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.category }}</td>
              <td>
                <a href="#" @click.prevent="editPost(index)">{{ post.title }}</a>
              </td>
              <td>{{ post.author }}</td>
              <td>{{ post.date }}</td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button class="btn btn-secondary" @click="prevPage" :disabled="currentPage === 1">이전</button>
          <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">다음</button>
        </div>
        <button class="btn btn-primary mt-3" @click="showForm">글쓰기</button>
      </section>
      
      <section class="form-section mt-5" v-if="showFormSection">
        <h2>{{ isEditing ? '글 수정' : '글 작성' }}</h2>
        <form @submit.prevent="savePost">
          <div class="form-group">
            <label for="category">구분:</label>
            <input type="text" id="category" class="form-control" v-model="formData.category" required>
          </div>
          <div class="form-group">
            <label for="title">제목:</label>
            <input type="text" id="title" class="form-control" v-model="formData.title" required>
          </div>
          <div class="form-group">
            <label for="author">작성자:</label>
            <input type="text" id="author" class="form-control" v-model="formData.author" required>
          </div>
          <div class="form-group">
            <label for="content">내용:</label>
            <textarea id="content" class="form-control" v-model="formData.content" required></textarea>
          </div>
          <button type="submit" class="btn btn-success">{{ isEditing ? '수정' : '저장' }}</button>
          <button type="button" class="btn btn-secondary" @click="hideForm">취소</button>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        { id: 100, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
        { id: 101, category: '커뮤니티', title: '안녕하세요!', author: '시험', date: '2024-05-16 15:24:59', content: '안녕하세요!' },
        { id: 102, category: '커뮤니티', title: '안녕하세요', author: '소연', date: '2024-05-16 15:24:59', content: '안녕하세요' },
        { id: 103, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
         { id: 104, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
        { id: 105, category: '커뮤니티', title: '안녕하세요!', author: '시험', date: '2024-05-16 15:24:59', content: '안녕하세요!' },
        { id: 106, category: '커뮤니티', title: '안녕하세요', author: '소연', date: '2024-05-16 15:24:59', content: '안녕하세요' },
        { id: 107, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
         { id: 108, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
        { id: 109, category: '커뮤니티', title: '안녕하세요!', author: '시험', date: '2024-05-16 15:24:59', content: '안녕하세요!' },
        { id: 110, category: '커뮤니티', title: '안녕하세요', author: '소연', date: '2024-05-16 15:24:59', content: '안녕하세요' },
        { id: 111, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
         { id: 112, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
        { id: 113, category: '커뮤니티', title: '안녕하세요!', author: '시험', date: '2024-05-16 15:24:59', content: '안녕하세요!' },
        { id: 114, category: '커뮤니티', title: '안녕하세요', author: '소연', date: '2024-05-16 15:24:59', content: '안녕하세요' },
        { id: 115, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
         { id: 116, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
        { id: 117, category: '커뮤니티', title: '안녕하세요!', author: '시험', date: '2024-05-16 15:24:59', content: '안녕하세요!' },
        { id: 118, category: '커뮤니티', title: '안녕하세요', author: '소연', date: '2024-05-16 15:24:59', content: '안녕하세요' },
        { id: 119, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
         { id: 120, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
        { id: 121, category: '커뮤니티', title: '안녕하세요!', author: '시험', date: '2024-05-16 15:24:59', content: '안녕하세요!' },
        { id: 122, category: '커뮤니티', title: '안녕하세요', author: '소연', date: '2024-05-16 15:24:59', content: '안녕하세요' },
        { id: 123, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
         { id: 124, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' },
        { id: 125, category: '커뮤니티', title: '안녕하세요!', author: '시험', date: '2024-05-16 15:24:59', content: '안녕하세요!' },
        { id: 126, category: '커뮤니티', title: '안녕하세요', author: '소연', date: '2024-05-16 15:24:59', content: '안녕하세요' },
        { id: 127, category: '커뮤니티', title: 'abc', author: 'admin', date: '2024-05-16 15:24:59', content: 'abc' }

      ],
      itemsPerPage: 10,
      currentPage: 1,
      showFormSection: false,
      isEditing: false,
      formData: {
        id: null,
        category: '',
        title: '',
        author: '',
        content: '',
        date: ''
      }
    };
  },
  computed: {
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.posts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.itemsPerPage);
    }
  },
  methods: {
    showForm() {
      this.resetForm();
      this.showFormSection = true;
      this.isEditing = false;
    },
    hideForm() {
      this.showFormSection = false;
    },
    resetForm() {
      this.formData = {
        id: null,
        category: '',
        title: '',
        author: '',
        content: '',
        date: ''
      };
    },
    savePost() {
      const date = new Date().toISOString().replace('T', ' ').split('.')[0];
      if (this.isEditing) {
        const index = this.posts.findIndex(post => post.id === this.formData.id);
        this.posts[index] = { ...this.formData, date };
      } else {
        const newPost = { ...this.formData, id: this.posts.length ? this.posts[this.posts.length - 1].id + 1 : 100, date };
        this.posts.push(newPost);
      }
      this.hideForm();
    },
    editPost(index) {
      this.formData = { ...this.posts[index] };
      this.showFormSection = true;
      this.isEditing = true;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

header {
  text-align: center;
  padding: 20px;
}

.table th, .table td {
  text-align: center;
}

.pagination {
  text-align: center;
  margin: 20px 0;
}
</style>
