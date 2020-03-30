<template>
  <b-navbar type="is-primary">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Simple-vue-medium
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <router-link class="button is-light" to="/login">Log in</router-link>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
