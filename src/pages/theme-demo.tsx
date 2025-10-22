import React from 'react';
import useTheme from '@/hooks/useTheme';
import ThemeToggle from '@/components/ThemeToggle';
import MapThemeDemo from '@/components/MapThemeDemo';

const ThemeDemo: React.FC = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h1
              className="text-3xl font-bold"
              style={{ color: 'var(--color-brand)' }}
            >
              主题切换演示
            </h1>
            <ThemeToggle />
          </div>
          <p className="text-lg" style={{ color: 'var(--color-secondary)' }}>
            当前主题:{' '}
            <span className="font-semibold">
              {theme === 'dark' ? '暗黑主题' : '明亮主题'}
            </span>
          </p>
        </div>

        {/* Theme Selection */}
        <div className="mb-8">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: 'var(--color-brand)' }}
          >
            选择主题
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => changeTheme('dark')}
              className={`rounded-lg border px-4 py-2 transition-all ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 bg-transparent hover:bg-gray-100'
              }`}
            >
              暗黑主题
            </button>
            <button
              onClick={() => changeTheme('bright')}
              className={`rounded-lg border px-4 py-2 transition-all ${
                theme === 'bright'
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 bg-transparent hover:bg-gray-100'
              }`}
            >
              明亮主题
            </button>
          </div>
        </div>

        {/* Color Palette Demo */}
        <div className="mb-8">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: 'var(--color-brand)' }}
          >
            颜色调色板
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: 'var(--color-brand)', color: 'white' }}
            >
              <div className="font-semibold">Primary</div>
              <div className="text-sm opacity-80">var(--color-brand)</div>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'white',
              }}
            >
              <div className="font-semibold">Secondary</div>
              <div className="text-sm opacity-80">var(--color-secondary)</div>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-tx)',
              }}
            >
              <div className="font-semibold">Background</div>
              <div className="text-sm opacity-60">var(--color-bg)</div>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: 'var(--color-activity-card)',
                color: 'var(--color-tx)',
                border: '1px solid var(--color-hr)',
              }}
            >
              <div className="font-semibold">Card</div>
              <div className="text-sm opacity-60">
                var(--color-activity-card)
              </div>
            </div>
          </div>
        </div>

        {/* Map Theme Demo */}
        <div className="mb-8">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: 'var(--color-brand)' }}
          >
            地图主题演示
          </h2>
          <div className="mb-6">
            <MapThemeDemo />
          </div>
        </div>

        {/* Component Demo */}
        <div className="mb-8">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: 'var(--color-brand)' }}
          >
            组件演示
          </h2>

          {/* Activity Cards */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border p-6 transition-all hover:-translate-y-1 hover:transform"
                style={{
                  backgroundColor: 'var(--color-activity-card)',
                  color: 'var(--color-tx)',
                  borderColor: 'var(--color-hr)',
                  boxShadow:
                    theme === 'bright'
                      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      : '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3
                  className="mb-2 text-lg font-semibold"
                  style={{ color: 'var(--color-brand)' }}
                >
                  跑步活动 {i}
                </h3>
                <p
                  className="mb-2 text-sm"
                  style={{ color: 'var(--color-run-date)' }}
                >
                  2024-01-{10 + i} 19:30
                </p>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">距离:</span> 5.{i} km
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">配速:</span> 5:2{i} /km
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">心率:</span> 15{i} bpm
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mb-6 flex gap-4">
            <button
              className="rounded-lg px-6 py-2 font-medium transition-all"
              style={{
                backgroundColor: 'var(--color-brand)',
                color: 'white',
                boxShadow:
                  theme === 'bright'
                    ? '0 2px 4px rgba(37, 99, 235, 0.2)'
                    : 'none',
              }}
            >
              主要按钮
            </button>
            <button
              className="rounded-lg border px-6 py-2 font-medium transition-all"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-brand)',
                borderColor: 'var(--color-brand)',
              }}
            >
              次要按钮
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr
                  style={{
                    backgroundColor: 'var(--color-run-row-hover-background)',
                  }}
                >
                  <th
                    className="p-3 text-left font-semibold"
                    style={{ color: 'var(--color-run-table-thead)' }}
                  >
                    日期
                  </th>
                  <th
                    className="p-3 text-left font-semibold"
                    style={{ color: 'var(--color-run-table-thead)' }}
                  >
                    距离
                  </th>
                  <th
                    className="p-3 text-left font-semibold"
                    style={{ color: 'var(--color-run-table-thead)' }}
                  >
                    配速
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr
                    key={i}
                    className="hover:transition-colors"
                    style={{
                      backgroundColor: 'var(--color-activity-card)',
                      color: 'var(--color-tx)',
                    }}
                  >
                    <td
                      className="p-3"
                      style={{ color: 'var(--color-run-date)' }}
                    >
                      2024-01-{10 + i}
                    </td>
                    <td className="p-3" style={{ color: 'var(--color-brand)' }}>
                      {5 + i}.2 km
                    </td>
                    <td
                      className="p-3"
                      style={{ color: 'var(--color-secondary)' }}
                    >
                      5:2{i} /km
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: 'var(--color-brand)' }}
          >
            主题特性
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: 'var(--color-activity-card)',
                border: '1px solid var(--color-hr)',
              }}
            >
              <h3
                className="mb-2 font-semibold"
                style={{ color: 'var(--color-brand)' }}
              >
                暗黑主题
              </h3>
              <ul
                className="space-y-1 text-sm"
                style={{ color: 'var(--color-tx)' }}
              >
                <li>• 深色背景，减少眼部疲劳</li>
                <li>• 高对比度，提升可读性</li>
                <li>• 适合夜间使用</li>
                <li>• 现代感设计</li>
              </ul>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: 'var(--color-activity-card)',
                border: '1px solid var(--color-hr)',
              }}
            >
              <h3
                className="mb-2 font-semibold"
                style={{ color: 'var(--color-brand)' }}
              >
                明亮主题
              </h3>
              <ul
                className="space-y-1 text-sm"
                style={{ color: 'var(--color-tx)' }}
              >
                <li>• 明亮背景，清晰易读</li>
                <li>• 丰富的阴影效果</li>
                <li>• 适合日间使用</li>
                <li>• 专业感设计</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo;
