import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'tests/e2e',workers:1,timeout:60000,
  use:{baseURL:'http://puzzle.test',channel:'chrome',viewport:{width:1440,height:1000},trace:'retain-on-failure'},
});
