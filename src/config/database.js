module.exports = {
  dialect: 'postgres',
  host: '172.17.0.2',
  username: 'postgres',
  password: '415263',
  database: 'todo',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
